import React from 'react';
import { Bell, AlertTriangle, Pill, Bath, Utensils, BedDouble } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions = [
    {
      id: 'call-nurse',
      icon: Bell,
      label: 'Call Nurse',
      color: 'bg-blue-500 hover:bg-blue-600 text-white',
      description: 'Request assistance'
    },
    {
      id: 'emergency',
      icon: AlertTriangle,
      label: 'Emergency',
      color: 'bg-red-500 hover:bg-red-600 text-white',
      description: 'Urgent help needed'
    },
    {
      id: 'medication',
      icon: Pill,
      label: 'Medication',
      color: 'bg-purple-500 hover:bg-purple-600 text-white',
      description: 'Request medicine'
    },
    {
      id: 'bathroom',
      icon: Bath,
      label: 'Bathroom',
      color: 'bg-teal-500 hover:bg-teal-600 text-white',
      description: 'Assistance needed'
    },
    {
      id: 'meal',
      icon: Utensils,
      label: 'Meal Service',
      color: 'bg-orange-500 hover:bg-orange-600 text-white',
      description: 'Request meal'
    },
    {
      id: 'comfort',
      icon: BedDouble,
      label: 'Comfort',
      color: 'bg-indigo-500 hover:bg-indigo-600 text-white',
      description: 'Adjust bed/pillows'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-4 border-2 border-blue-200">
      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        <Bell className="h-6 w-6 text-indigo-600" />
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className={`${action.color} rounded-xl p-4 transition-all transform hover:scale-105 active:scale-95 shadow-lg border-2 border-white/30`}
              title={action.description}
            >
              <Icon className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-bold">{action.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
