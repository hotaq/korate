import React from 'react';
import { Heart, Activity, Wind, Droplets } from 'lucide-react';

interface Vitals {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  bodyTemperature: number;
}

interface VitalsMonitorProps {
  vitals: Vitals;
}

const VitalsMonitor: React.FC<VitalsMonitorProps> = ({ vitals }) => {
  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { color: 'text-blue-600', bg: 'bg-blue-50', status: 'Low' };
    if (hr > 100) return { color: 'text-red-600', bg: 'bg-red-50', status: 'High' };
    return { color: 'text-green-600', bg: 'bg-green-50', status: 'Normal' };
  };

  const getO2Status = (o2: number) => {
    if (o2 < 95) return { color: 'text-red-600', bg: 'bg-red-50' };
    return { color: 'text-green-600', bg: 'bg-green-50' };
  };

  const hrStatus = getHeartRateStatus(vitals.heartRate);
  const o2Status = getO2Status(vitals.oxygenSaturation);

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl shadow-lg p-4 border-2 border-red-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Activity className="h-6 w-6 text-red-600" />
          Health Vitals
        </h3>
        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">● LIVE</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Heart Rate */}
        <div className={`${hrStatus.bg} rounded-xl p-4 border-2 ${hrStatus.color.replace('text-', 'border-')} shadow-md`}>
          <div className="flex items-center gap-2 mb-2">
            <Heart className={`h-5 w-5 ${hrStatus.color}`} />
            <span className="text-sm font-semibold text-gray-700">Heart Rate</span>
          </div>
          <div className={`text-3xl font-black ${hrStatus.color}`}>
            {vitals.heartRate}
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">BPM</div>
        </div>

        {/* Blood Pressure */}
        <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">Blood Pressure</span>
          </div>
          <div className="text-3xl font-black text-purple-600">
            {vitals.bloodPressureSystolic}/{vitals.bloodPressureDiastolic}
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">mmHg</div>
        </div>

        {/* Oxygen Saturation */}
        <div className={`${o2Status.bg} rounded-xl p-4 border-2 ${o2Status.color.replace('text-', 'border-')} shadow-md`}>
          <div className="flex items-center gap-2 mb-2">
            <Wind className={`h-5 w-5 ${o2Status.color}`} />
            <span className="text-sm font-semibold text-gray-700">Oxygen (SpO₂)</span>
          </div>
          <div className={`text-3xl font-black ${o2Status.color}`}>
            {vitals.oxygenSaturation}%
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">Saturation</div>
        </div>

        {/* Respiratory Rate */}
        <div className="bg-cyan-50 rounded-xl p-4 border-2 border-cyan-200 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="h-5 w-5 text-cyan-600" />
            <span className="text-sm font-semibold text-gray-700">Respiratory</span>
          </div>
          <div className="text-3xl font-black text-cyan-600">
            {vitals.respiratoryRate}
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">breaths/min</div>
        </div>
      </div>

      {/* Body Temperature */}
      <div className="mt-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4 border-2 border-orange-300 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-gray-700">Body Temperature</span>
            <div className="text-3xl font-black text-orange-700 mt-1">
              {vitals.bodyTemperature}°C
            </div>
          </div>
          <div className={`text-sm font-bold ${vitals.bodyTemperature >= 37.5 ? 'text-red-600' : 'text-green-600'}`}>
            {vitals.bodyTemperature >= 37.5 ? '⚠️ Elevated' : '✓ Normal'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalsMonitor;
