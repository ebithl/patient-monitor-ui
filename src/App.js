import './App.css';
import PatientList from './components/PatientList';

function App() {
  return (
    <div className="App bg-gray-700 text-white min-h-screen">
      <h1 className="text-gray-400">Patient Risk Monitor</h1>
      <PatientList />
    </div>
  );
}

export default App;


//import React from 'react';
//import PatientVitalCard from './components/PatientVitalCard';
//
//function App() {
//  return (
//    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//      <PatientVitalCard
//        name="John Doe"
//        heartRate={76}
//        oxygen={97}
//        temperature={36.5}
//      />
//    </div>
//  );
//}
//
//export default App;


//import React from 'react';
//import './App.css';
//import PatientVitalCard from './components/PatientVitalCard';
////import patients from './data/patients.json';
//import PatientList from './components/PatientList';
//
//function App() {
//  return (
//    <div className="min-h-screen bg-gray-100 p-6">
//      <h1 className="text-2xl font-bold mb-6">Patient Vitals Dashboard</h1>
//      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//        {PatientList.map((patient) => (
//          <PatientVitalCard
//            key={patient.id}
//            name={patient.name}
//            temperature={patient.temperature}
//            pulse={patient.pulse}
//            spo2={patient.spo2}
//          />
//        ))}
//      </div>
//    </div>
//  );
//}
//
//export default App;

