import React from 'react';
import { Bed, Square, DoorOpen, Lightbulb, Thermometer, User, AlertTriangle } from 'lucide-react';
import { useRoomStore } from '../store/roomStore';

const RoomVisualization: React.FC = () => {
  const { roomData } = useRoomStore();

  return (
    <div className="relative rounded-xl p-6 room-wall shadow-md">
      {/* Ambient lighting overlay when lights are on */}
      {roomData.lighting && (
        <div className="absolute inset-0 room-ambient-light rounded-xl pointer-events-none" />
      )}

      {/* Ceiling */}
      <div className="room-ceiling" />

      {/* Room content using grid/flex for stable layout */}
      <div className="relative grid grid-cols-12 gap-6 mt-4">
        {/* Window - top-left */}
        <div className="col-span-4">
          <div className={`window-frame p-3 ${roomData.windowOpen ? 'ring-2 ring-blue-300' : ''}`}>
            <div className="flex items-center gap-2">
              <Square className={`${roomData.windowOpen ? 'text-blue-600' : 'text-gray-600'} h-7 w-7`} />
              <span className="text-sm font-medium text-gray-700">Window {roomData.windowOpen ? 'Open' : 'Closed'}</span>
            </div>
            <div className={`window-glass h-16 mt-2 ${roomData.windowOpen ? 'opacity-90' : 'opacity-70'}`}></div>
          </div>
        </div>

        {/* Sensors - top row center */}
        <div className="col-start-5 col-span-4 flex items-center justify-center gap-4">
          {/* Light */}
          <div className={`p-2 rounded-lg border-2 ${roomData.lighting ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-100 border-gray-300'}`}>
            <Lightbulb className={`${roomData.lighting ? 'text-yellow-600' : 'text-gray-600'} h-6 w-6`} />
          </div>
          {/* Temperature */}
          <div className="p-2 rounded-lg border-2 bg-orange-100 border-orange-300">
            <div className="flex items-center gap-2">
              <Thermometer className="h-6 w-6 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">{roomData.temperature}°C</span>
            </div>
          </div>
        </div>

        {/* Door - top-right */}
        <div className="col-start-9 col-span-4">
          <div className={`door-frame p-3 ${roomData.doorOpen ? 'ring-2 ring-green-300' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DoorOpen className={`${roomData.doorOpen ? 'text-green-600' : 'text-gray-600'} h-7 w-7`} />
                <span className="text-sm font-medium text-gray-700">Door {roomData.doorOpen ? 'Open' : 'Closed'}</span>
              </div>
              <div className="door-knob" />
            </div>
          </div>
        </div>

        {/* Room Info - middle center */}
        <div className="col-span-12 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-800">Room 204</h3>
            <p className="text-sm text-gray-600">Digital Twin Active</p>
            <div className="mt-2 flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600">Live</span>
            </div>
          </div>
        </div>

        {/* Bottom row - bed and furniture */}
        <div className="col-span-8 flex items-center justify-center">
          <div className="bed-frame p-4 w-full max-w-md">
            <div className="bed-headboard h-6 rounded-t-md mb-3"></div>
            <div className="flex items-center gap-3">
              <Bed className={`${roomData.occupancy ? 'text-blue-700' : 'text-gray-600'} h-10 w-10`} />
              {roomData.occupancy && <User className="h-6 w-6 text-blue-600" />}
              <span className="text-sm font-medium text-gray-700">{roomData.occupancy ? 'Occupied' : 'Vacant'}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-10 h-4 bg-white rounded-md shadow-sm"></div>
              <div className="w-16 h-3 bg-white rounded-sm shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Nightstand */}
        <div className="col-span-2 flex items-center justify-center">
          <div className="nightstand p-3 w-full max-w-[120px]">
            <div className="w-6 h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-2 bg-gray-400 rounded"></div>
          </div>
        </div>

        {/* Chair */}
        <div className="col-span-2 flex items-center justify-center">
          <div className="chair p-3 w-full max-w-[120px]">
            <div className="h-4 bg-blue-200 rounded mb-2"></div>
            <div className="h-6 bg-blue-100 rounded"></div>
          </div>
        </div>

        {/* Emergency Button */}
        <div className="col-start-10 col-span-3 flex items-center justify-end">
          <div className={`p-3 rounded-full border-2 ${roomData.emergency ? 'bg-red-200 border-red-400 animate-pulse' : 'bg-gray-200 border-gray-400'}`}>
            {roomData.emergency ? (
              <AlertTriangle className="h-8 w-8 text-red-600" />
            ) : (
              <div className="w-8 h-8 bg-red-500 rounded-full"></div>
            )}
          </div>
          <span className="ml-3 text-xs font-medium text-gray-700">Emergency</span>
        </div>
      </div>

      {/* Floor strip */}
      <div className="mt-6 h-24 room-floor" />
    </div>
  );
};

export default RoomVisualization;