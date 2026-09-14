import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  status: 'normal' | 'warning' | 'danger';
  subtitle?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, icon: Icon, status, subtitle }) => {
  const statusColors = {
    normal: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    danger: 'bg-red-50 border-red-200 text-red-800'
  };

  const iconColors = {
    normal: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  };

  return (
    <div className={`p-3 rounded-lg border-2 ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-gray-600">{title}</p>
        <Icon className={`h-5 w-5 ${iconColors[status]}`} />
      </div>
      <p className="text-xl font-bold mb-1">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  );
};

export default StatusCard;