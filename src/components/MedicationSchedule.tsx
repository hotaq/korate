import React from 'react';
import { Pill, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  status: 'taken' | 'due' | 'upcoming' | 'missed';
}

interface MedicationScheduleProps {
  medications: Medication[];
}

const MedicationSchedule: React.FC<MedicationScheduleProps> = ({ medications }) => {
  const getStatusStyle = (status: Medication['status']) => {
    switch (status) {
      case 'taken':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          icon: CheckCircle,
          iconColor: 'text-green-500'
        };
      case 'due':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          icon: Clock,
          iconColor: 'text-yellow-500'
        };
      case 'missed':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          icon: AlertCircle,
          iconColor: 'text-red-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          icon: Clock,
          iconColor: 'text-gray-400'
        };
    }
  };

  const nextDue = medications.find(m => m.status === 'due' || m.status === 'upcoming');

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Pill className="h-5 w-5 text-purple-600" />
          Medications
        </h3>
        {nextDue && (
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
            Next: {nextDue.time}
          </span>
        )}
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {medications.map((med) => {
          const style = getStatusStyle(med.status);
          const StatusIcon = style.icon;

          return (
            <div
              key={med.id}
              className={`${style.bg} border-2 ${style.border} rounded-xl p-3 shadow-md`}
            >
              <div className="flex items-start gap-2">
                <StatusIcon className={`h-5 w-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-base ${style.text}`}>
                      {med.name}
                    </span>
                    <span className={`text-sm ${style.text} font-black`}>
                      {med.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-medium text-gray-700">{med.dosage}</span>
                    <span className={`text-xs ${style.text} uppercase font-bold px-2 py-0.5 rounded`}>
                      {med.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {medications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Pill className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-base font-semibold">No medications scheduled</p>
        </div>
      )}
    </div>
  );
};

export default MedicationSchedule;
