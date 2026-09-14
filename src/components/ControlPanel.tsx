import React from 'react';
import { 
  Lightbulb, 
  LightbulbOff, 
  DoorOpen, 
  DoorClosed, 
  Wind,
  User,
  UserX,
  AlertTriangle,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useRoomStore } from '../store/roomStore';

const ControlPanel: React.FC = () => {
  const { roomData, updateRoomData } = useRoomStore();
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleTemperatureChange = (value: number) => {
    updateRoomData({ temperature: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h3 className="font-semibold">Room Controls</h3>
        </div>
        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </div>

      {/* Controls */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Lighting Control */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {roomData.lighting ? (
                <Lightbulb className="h-5 w-5 text-yellow-500" />
              ) : (
                <LightbulbOff className="h-5 w-5 text-gray-400" />
              )}
              <span className="font-medium text-gray-700">Lighting</span>
            </div>
            <button
              onClick={() => updateRoomData({ lighting: !roomData.lighting })}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                roomData.lighting
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              }`}
            >
              {roomData.lighting ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Door Control */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {roomData.doorOpen ? (
                <DoorOpen className="h-5 w-5 text-green-500" />
              ) : (
                <DoorClosed className="h-5 w-5 text-gray-400" />
              )}
              <span className="font-medium text-gray-700">Door</span>
            </div>
            <button
              onClick={() => updateRoomData({ doorOpen: !roomData.doorOpen })}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                roomData.doorOpen
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              }`}
            >
              {roomData.doorOpen ? 'OPEN' : 'CLOSED'}
            </button>
          </div>

          {/* Window Control */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Wind className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-gray-700">Window</span>
            </div>
            <button
              onClick={() => updateRoomData({ windowOpen: !roomData.windowOpen })}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                roomData.windowOpen
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              }`}
            >
              {roomData.windowOpen ? 'OPEN' : 'CLOSED'}
            </button>
          </div>

          {/* Occupancy Control */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {roomData.occupancy ? (
                <User className="h-5 w-5 text-blue-600" />
              ) : (
                <UserX className="h-5 w-5 text-gray-400" />
              )}
              <span className="font-medium text-gray-700">Occupancy</span>
            </div>
            <button
              onClick={() => updateRoomData({ occupancy: !roomData.occupancy })}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                roomData.occupancy
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              }`}
            >
              {roomData.occupancy ? 'OCCUPIED' : 'VACANT'}
            </button>
          </div>

          {/* Emergency Button */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className={`h-5 w-5 ${roomData.emergency ? 'text-red-500' : 'text-gray-400'}`} />
              <span className="font-medium text-gray-700">Emergency</span>
            </div>
            <button
              onClick={() => updateRoomData({ emergency: !roomData.emergency })}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                roomData.emergency
                  ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              }`}
            >
              {roomData.emergency ? 'ACTIVE' : 'NORMAL'}
            </button>
          </div>

          {/* Temperature Slider */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Temperature</span>
              <span className="text-lg font-bold text-indigo-600">{roomData.temperature}°C</span>
            </div>
            <input
              type="range"
              min="18"
              max="28"
              step="0.5"
              value={roomData.temperature}
              onChange={(e) => handleTemperatureChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>18°C</span>
              <span>23°C</span>
              <span>28°C</span>
            </div>
          </div>

          {/* Air Quality Selector */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Air Quality</span>
              <span className={`text-sm font-semibold ${
                roomData.airQuality === 'Good' ? 'text-green-600' :
                roomData.airQuality === 'Fair' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {roomData.airQuality}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateRoomData({ airQuality: 'Good' })}
                className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                  roomData.airQuality === 'Good'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                Good
              </button>
              <button
                onClick={() => updateRoomData({ airQuality: 'Fair' })}
                className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                  roomData.airQuality === 'Fair'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                Fair
              </button>
              <button
                onClick={() => updateRoomData({ airQuality: 'Poor' })}
                className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                  roomData.airQuality === 'Poor'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                Poor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
