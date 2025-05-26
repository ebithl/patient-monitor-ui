import { useEffect, useState } from 'react';
import VitalBox from './VitalBox';

//const getShadowClass = (risk) => {
//  switch (risk) {
//    case "low": return 'shadow-green-500';
//    case "medium": return 'shadow-yellow-500';
//    case "high": return 'shadow-red-500';
//    default: return 'shadow-gray-300';
//  }
//};

const getShadowClass = (risk) => {
  switch (risk) {
    case "low": return 'shadow-green-400/40';
    case "medium": return 'shadow-yellow-400/40';
    case "high": return 'shadow-red-400/40';
    default: return 'shadow-gray-600/30';
  }
};

const riskBorders = {
  low: 'border-green-400',
  medium: 'border-yellow-400',
  high: 'border-red-500',
  unknown: 'border-gray-300'
};

const riskColors = {
  low: 'text-green-700',
  medium: 'text-yellow-700',
  high: 'text-red-700',
  unknown: 'text-gray-700'
};

const getVitalClass = (vital, value) => {
  const classes = {
    base: "flex flex-col items-center justify-center p-2 rounded-lg w-24 text-sm",
    normal: "bg-gray-100 text-gray-800",
    warning: {
      temp: value > 100.4 ? "bg-red-500 text-white-700" : "bg-gray-100 text-gray-800",
      pulse: value < 60 || value > 100 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800",
      spo2: value < 95 ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800",
      rr: (value < 8 || value > 22) ? "bg-red-200 text-white-800" : "bg-gray-100 text-gray-800",
      bp: "bg-gray-100 text-gray-800"
    }
  };
  return `${classes.base} ${classes.warning[vital]}`;
};

const getRiskBadgeStyle = (riskLevel) => {
  switch (riskLevel) {
    case "high":
      return "bg-red-100 text-red-800 border-red-400";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-400";
    case "low":
    default:
      return "bg-green-100 text-green-800 border-green-400";
  }
};

const getRiskColor = (risk) => {
  switch (risk) {
    case "low": return 'bg-green-500'; // Low
    case "medium": return 'bg-yellow-400'; // Moderate
    case "high": return 'bg-red-500'; // High
    default: return 'bg-gray-400';
  }
};

const getRiskLabel = (risk) => {
  switch (risk) {
    case "low": return 'Low';
    case "medium": return 'Moderate';
    case "high": return 'High';
    default: return 'Unknown';
  }
};

const PatientVitalCard = ({ patient, risk }) => {
  const vitals = patient.vitals.at(-1);
  const borderClass = riskBorders[risk] || riskBorders.unknown;
  const textColor = riskColors[risk] || riskColors.unknown;
  
  console.log(`Patient: ${patient.name}, Risk: ${risk}`);

  return (


<div className={`w-[250px] h-[120px] bg-gray-600 rounded-xl p-2 shadow-md ${getShadowClass(risk)} flex flex-col justify-between`}>


     
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-400 font-semibold">{patient.name} ({(patient.gender).charAt(0).toUpperCase()} {patient.age})</h3>
        {risk !== undefined && (
        <>

          <div
	      className={`w-3 h-3 rounded-full ${getRiskColor(risk)}`}
	      title={`Risk: ${getRiskLabel(risk)}`}
          ></div>
        </>
        )}
      </div>



      <div className="flex justify-between items-center mt-2 px-1 space-x-1">

      
        {vitals && (
          <>

  <VitalBox label="HR" value={vitals.pulse} unit="bpm" isCritical={vitals.pulse > 100 || vitals.pulse < 60} />
  <VitalBox label="SpO₂" value={vitals.spo2} unit="%" isCritical={vitals.spo2 < 94} />
  <VitalBox label="RR" value={vitals.rr} unit="rpm" isCritical={vitals.rr > 22 || vitals.rr < 12} />
  <VitalBox label="BP" value={vitals.bp} unit="" isCritical={false /* placeholder */} />         
  <VitalBox label="Temp" value={vitals.temp} unit="°F" isCritical={vitals.temp > 100.4} />
   


            
          </>
        )}
      </div>


    </div>
  );
};


export default PatientVitalCard;
