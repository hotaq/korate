import React from 'react';
import { Camera, Eye, Home, Bed, Grid3x3 } from 'lucide-react';

export interface CameraPreset {
  name: string;
  position: [number, number, number];
  target: [number, number, number];
  icon: React.ReactNode;
}

interface CameraControlsProps {
  onPresetChange: (preset: CameraPreset) => void;
  currentPreset?: string;
}

export const cameraPresets: CameraPreset[] = [
  {
    name: 'Default',
    position: [7, 4, 7],
    target: [0, 1.2, -2],
    icon: <Home className="h-4 w-4" />
  },
  {
    name: 'Entrance',
    position: [5, 2, 4],
    target: [0, 1, -2],
    icon: <Eye className="h-4 w-4" />
  },
  {
    name: 'Bed View',
    position: [2, 2, -3],
    target: [-1.5, 1, -3],
    icon: <Bed className="h-4 w-4" />
  },
  {
    name: 'Overhead',
    position: [0, 8, -1],
    target: [0, 0, -2],
    icon: <Grid3x3 className="h-4 w-4" />
  },
  {
    name: 'Window',
    position: [-3, 2.5, -2],
    target: [-5, 3, -2],
    icon: <Camera className="h-4 w-4" />
  }
];

const CameraControls: React.FC<CameraControlsProps> = ({ onPresetChange, currentPreset }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Camera className="h-5 w-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">Camera Views</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {cameraPresets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onPresetChange(preset)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
              currentPreset === preset.name
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-600'
            }`}
          >
            {preset.icon}
            <span className="text-xs font-medium mt-1">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CameraControls;
