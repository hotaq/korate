import React, { useState, useEffect } from 'react';
import { Clock, Sunrise, Sun, Moon } from 'lucide-react';

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getShift = (hour: number) => {
    if (hour >= 6 && hour < 14) {
      return { name: 'Morning Shift', icon: Sunrise, color: 'text-orange-500', bg: 'bg-orange-50' };
    } else if (hour >= 14 && hour < 22) {
      return { name: 'Afternoon Shift', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-50' };
    } else {
      return { name: 'Night Shift', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' };
    }
  };

  const hour = time.getHours();
  const shift = getShift(hour);
  const ShiftIcon = shift.icon;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-4 text-white">
      <div className="flex items-center justify-between">
        {/* Time Display */}
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6" />
          <div>
            <div className="text-2xl font-bold tabular-nums">
              {formatTime(time)}
            </div>
            <div className="text-xs opacity-90">
              {formatDate(time)}
            </div>
          </div>
        </div>

        {/* Shift Indicator */}
        <div className={`${shift.bg} ${shift.color} px-3 py-2 rounded-lg`}>
          <div className="flex items-center gap-2">
            <ShiftIcon className="h-4 w-4" />
            <div className="text-xs font-semibold">
              {shift.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClock;
