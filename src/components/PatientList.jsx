//// client/src/components/PatientList.jsx
//import { useEffect, useState } from 'react';
//
//const PatientList = () => {
//  const [patients, setPatients] = useState([]);
//
//  useEffect(() => {
//    fetch('http://localhost:5000/api/patients')
//      .then(res => res.json())
//      .then(data => setPatients(data))
//      .catch(err => console.error("API error:", err));
//  }, []);
//
//  return (
//    <div>
//      <h2>Patient List</h2>
//      {patients.map(patient => (
//        <div key={patient.id} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc' }}>
//          <h4>{patient.name} ({patient.age} yrs)</h4>
//          <p><strong>Latest Vitals:</strong></p>
//          <pre>{JSON.stringify(patient.vitals.at(-1), null, 2)}</pre>
//        </div>
//      ))}
//    </div>
//  );
//};
//
//export default PatientList;


import { useEffect, useState } from 'react';
import PatientCard from './PatientVitalCard';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [risks, setRisks] = useState({});

  useEffect(() => {
    const fetchData = () => {
    fetch('http://localhost:5000/api/patients')
      .then(res => res.json())
      .then(async data => {
        setPatients(data);

        // Fetch risk for each patient based on latest vitals
        const riskData = {};
        for (const patient of data) {
          const latestVitals = patient.vitals.at(-1);
          try {
            const res = await fetch('http://localhost:5000/api/predict', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(latestVitals)
            });
            const result = await res.json();
            
            console.log("############## result.risk_level ############### " + result.risk);
            
            riskData[patient.id] = result.risk;
            
            //riskData[patient.id] = result.risk_level === 0 ? 'low' :
            //                       result.risk_level === 1 ? 'medium' :
            //                       result.risk_level === 2 ? 'high' : 'unknown';
          } catch (err) {
            console.error(`Error predicting risk for patient ${patient.id}`, err);
            riskData[patient.id] = 'unknown';
          }
        }

        setRisks(riskData);
      });
      };

      fetchData(); // initial fetch
      const interval = setInterval(fetchData, 5000); // every 5 seconds
      return () => clearInterval(interval);
      
  }, []);

  return (

    <div className="grid grid-cols-5 gap-2 p-4 text-sm">
      {patients.map(patient => (
        <PatientCard key={patient.id} patient={patient} risk={risks[patient.id]} />
      ))}
    </div>
  );
};

export default PatientList;


