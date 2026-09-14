import React from 'react';
import { User, Calendar, Phone, AlertCircle } from 'lucide-react';

interface PatientInfoProps {
  name: string;
  age: number;
  roomNumber: string;
  admissionDate: string;
  conditions: string[];
  emergencyContact: string;
}

const PatientInfo: React.FC<PatientInfoProps> = ({
  name,
  age,
  roomNumber,
  admissionDate,
  conditions,
  emergencyContact
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg p-5 border-2 border-blue-300">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-black shadow-lg border-4 border-white">
            {name.charAt(0)}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-black text-gray-900">{name}</h3>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-700 mt-1">
            <User className="h-5 w-5" />
            <span>{age} years old</span>
            <span className="text-gray-400">•</span>
            <span>Room {roomNumber}</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mt-2">
            <Calendar className="h-4 w-4" />
            <span>Admitted: {admissionDate}</span>
          </div>

          {/* Conditions */}
          {conditions.length > 0 && (
            <div className="flex items-start gap-2 mt-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full font-bold shadow-md"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mt-3 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
            <Phone className="h-4 w-4 text-blue-600" />
            <span className="font-bold text-gray-700">Emergency:</span>
            <span className="text-blue-600">{emergencyContact}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
