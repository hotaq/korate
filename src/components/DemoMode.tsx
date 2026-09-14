import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { useRoomStore } from '../store/roomStore';
import { CameraPreset, cameraPresets } from './CameraControls';

interface DemoModeProps {
  onCameraChange: (preset: CameraPreset) => void;
}

const DemoMode: React.FC<DemoModeProps> = ({ onCameraChange }) => {
  const { updateRoomData } = useRoomStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = React.useMemo(() => [
    {
      name: 'Welcome',
      duration: 3000,
      camera: cameraPresets[0],
      actions: () => {
        updateRoomData({ 
          lighting: true, 
          occupancy: true, 
          doorOpen: false, 
          windowOpen: false,
          emergency: false,
          temperature: 22,
          airQuality: 'Good'
        });
      }
    },
    {
      name: 'Patient Occupied',
      duration: 4000,
      camera: cameraPresets[2],
      actions: () => {
        updateRoomData({ occupancy: true });
      }
    },
    {
      name: 'Door Opening',
      duration: 3000,
      camera: cameraPresets[1],
      actions: () => {
        updateRoomData({ doorOpen: true });
      }
    },
    {
      name: 'Window & Natural Light',
      duration: 4000,
      camera: cameraPresets[4],
      actions: () => {
        updateRoomData({ windowOpen: true, doorOpen: false });
      }
    },
    {
      name: 'Overhead View',
      duration: 3000,
      camera: cameraPresets[3],
      actions: () => {
        updateRoomData({ windowOpen: true });
      }
    },
    {
      name: 'Night Mode',
      duration: 3000,
      camera: cameraPresets[0],
      actions: () => {
        updateRoomData({ lighting: false, windowOpen: false });
      }
    },
    {
      name: 'Emergency Alert',
      duration: 3000,
      camera: cameraPresets[0],
      actions: () => {
        updateRoomData({ emergency: true, lighting: true });
      }
    },
    {
      name: 'Back to Normal',
      duration: 2000,
      camera: cameraPresets[0],
      actions: () => {
        updateRoomData({ 
          emergency: false,
          lighting: true,
          temperature: 22,
          airQuality: 'Good'
        });
      }
    }
  ], [updateRoomData]);

  useEffect(() => {
    if (!isPlaying) return;

    const step = demoSteps[currentStep];
    
    // Execute step actions
    step.actions();
    onCameraChange(step.camera);

    // Move to next step after duration
    const timer = setTimeout(() => {
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Loop back to start
        setCurrentStep(0);
      }
    }, step.duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, demoSteps, onCameraChange, updateRoomData]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    demoSteps[0].actions();
    onCameraChange(demoSteps[0].camera);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">Demo Mode</h3>
            {isPlaying && (
              <p className="text-xs text-purple-100">
                Step {currentStep + 1}/{demoSteps.length}: {demoSteps[currentStep].name}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePlayPause}
            className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-all flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start Tour
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {isPlaying && (
        <div className="mt-3">
          <div className="h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ 
                width: `${((currentStep + 1) / demoSteps.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoMode;
