import React from 'react';
import { Heart, Thermometer, Wind, Lightbulb, Shield, Bell, Info, Settings, X } from 'lucide-react';
import Room3D from '../components/Room3D';
import StatusCard from '../components/StatusCard';
import ControlPanel from '../components/ControlPanel';
import CameraControls, { CameraPreset } from '../components/CameraControls';
import DemoMode from '../components/DemoMode';
import PatientInfo from '../components/PatientInfo';
import VitalsMonitor from '../components/VitalsMonitor';
import QuickActions from '../components/QuickActions';
import MedicationSchedule from '../components/MedicationSchedule';
import LiveClock from '../components/LiveClock';
import { useRoomStore } from '../store/roomStore';

const Dashboard: React.FC = () => {
  const { roomData, addAlert } = useRoomStore();
  const [iotOpen, setIotOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [cameraPosition, setCameraPosition] = React.useState<[number, number, number]>([7, 4, 7]);
  const [cameraTarget, setCameraTarget] = React.useState<[number, number, number]>([0, 1.2, -2]);
  const [currentPreset, setCurrentPreset] = React.useState<string>('Default');

  const handleCameraPreset = React.useCallback((preset: CameraPreset) => {
    setCameraPosition(preset.position);
    setCameraTarget(preset.target);
    setCurrentPreset(preset.name);
  }, []);

  const handleQuickAction = React.useCallback((action: string) => {
    const actionMessages: Record<string, {type: 'info' | 'warning' | 'error' | 'success', title: string, message: string}> = {
      'call-nurse': { type: 'info', title: 'Nurse Called', message: 'Assistance request sent to nursing station' },
      'emergency': { type: 'error', title: 'Emergency Alert', message: 'Emergency services have been notified!' },
      'medication': { type: 'info', title: 'Medication Requested', message: 'Nurse will bring medication shortly' },
      'bathroom': { type: 'info', title: 'Bathroom Assistance', message: 'Staff member on the way' },
      'meal': { type: 'info', title: 'Meal Service', message: 'Kitchen has been notified' },
      'comfort': { type: 'info', title: 'Comfort Adjustment', message: 'Staff will assist with bed adjustment' }
    };

    const alertData = actionMessages[action] || { type: 'info', title: 'Action', message: 'Request sent' };
    addAlert(alertData);
  }, [addAlert]);

  const statusCards = [
    {
      title: 'Room Temperature',
      value: `${roomData.temperature}°C`,
      icon: Thermometer,
      status: (roomData.temperature > 24 ? 'warning' : 'normal') as 'normal' | 'warning' | 'danger',
      subtitle: 'Optimal: 20-24°C'
    },
    {
      title: 'Air Quality',
      value: roomData.airQuality,
      icon: Wind,
      status: (roomData.airQuality === 'Poor' ? 'warning' : 'normal') as 'normal' | 'warning' | 'danger',
      subtitle: 'Current status'
    },
    {
      title: 'Lighting',
      value: roomData.lighting ? 'On' : 'Off',
      icon: Lightbulb,
      status: 'normal' as const,
      subtitle: roomData.lighting ? 'Brightness: 75%' : 'Lights off'
    },
    {
      title: 'Emergency Status',
      value: roomData.emergency ? 'Active' : 'Safe',
      icon: Shield,
      status: (roomData.emergency ? 'danger' : 'normal') as 'normal' | 'warning' | 'danger',
      subtitle: 'Last check: 2 min ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nursing Home Digital Twin</h1>
                <p className="text-sm text-gray-500">Room 204 - Real-time Monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Room Settings & Controls"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Room Settings</span>
                <span className="sm:hidden">Settings</span>
              </button>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Open IoT device information"
                onClick={() => setIotOpen(true)}
              >
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">IoT Device Info</span>
                <span className="sm:hidden">IoT</span>
              </button>
              <Bell className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Bar - Clock and Demo Mode */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <LiveClock />
          <DemoMode onCameraChange={handleCameraPreset} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Left Column - 3D View & Info */}
          <div className="xl:col-span-7 space-y-4">
            {/* Patient Info */}
            <PatientInfo {...roomData.patient} />

            {/* 3D View */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Room Layout (3D)</h2>
              <Room3D cameraPosition={cameraPosition} cameraTarget={cameraTarget} />
            </div>

            {/* Camera Controls */}
            <CameraControls onPresetChange={handleCameraPreset} currentPreset={currentPreset} />

            {/* Room Status - Moved below Camera Controls */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Room Status</h3>
              <div className="grid grid-cols-2 gap-3">
                {statusCards.map((card, index) => (
                  <StatusCard key={index} {...card} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Controls & Medical Info */}
          <div className="xl:col-span-5 space-y-4">
            {/* Vitals Monitor */}
            <VitalsMonitor vitals={roomData.vitals} />

            {/* Quick Actions */}
            <QuickActions onAction={handleQuickAction} />

            {/* Medication Schedule */}
            <MedicationSchedule medications={roomData.medications} />
          </div>
        </div>

        {/* Additional Info - Compact */}
        <div className="mt-4 bg-white rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{roomData.occupancy ? 'Occupied' : 'Vacant'}</div>
              <div className="text-xs text-gray-500 mt-1">Occupancy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{roomData.lastCleaned}h</div>
              <div className="text-xs text-gray-500 mt-1">Last Cleaned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{roomData.visitsToday}</div>
              <div className="text-xs text-gray-500 mt-1">Visits Today</div>
            </div>
          </div>
        </div>
      </div>

      {iotOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="iot-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIotOpen(false);
          }}
        >
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                <h2 id="iot-title" className="text-lg font-semibold">IoT Device Information</h2>
              </div>
              <button
                className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
                onClick={() => setIotOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Connectivity</div>
                <div className="font-medium">{roomData.lighting ? 'Online' : 'Standby'}</div>
              </div>
              <div>
                <div className="text-gray-500">Battery</div>
                <div className="font-medium">{roomData.occupancy ? 'Full' : 'Medium'}</div>
              </div>
              <div>
                <div className="text-gray-500">Sensors</div>
                <div className="font-medium">Temp, Light, Air Quality, Occupancy</div>
              </div>
              <div>
                <div className="text-gray-500">Last Sync</div>
                <div className="font-medium">{roomData.lastCleaned}h ago</div>
              </div>
              <div>
                <div className="text-gray-500">Temperature</div>
                <div className="font-medium">{roomData.temperature}°C</div>
              </div>
              <div>
                <div className="text-gray-500">Air Quality</div>
                <div className="font-medium">{roomData.airQuality}</div>
              </div>
              <div>
                <div className="text-gray-500">Window</div>
                <div className="font-medium">{roomData.windowOpen ? 'Open' : 'Closed'}</div>
              </div>
              <div>
                <div className="text-gray-500">Door</div>
                <div className="font-medium">{roomData.doorOpen ? 'Open' : 'Closed'}</div>
              </div>
            </div>

            <div className="px-4 pb-4 text-xs text-gray-500">
              Data updates live from room sensors every few seconds.
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal with Room Controls */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSettingsOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Room Settings & Controls</h2>
              </div>
              <button
                className="p-2 rounded-md hover:bg-white/20 transition"
                onClick={() => setSettingsOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <ControlPanel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;