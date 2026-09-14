import { create } from 'zustand';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: number;
}

interface PatientInfo {
  name: string;
  age: number;
  roomNumber: string;
  admissionDate: string;
  conditions: string[];
  emergencyContact: string;
}

interface Vitals {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  bodyTemperature: number;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  status: 'taken' | 'due' | 'upcoming' | 'missed';
}

interface RoomData {
  temperature: number;
  airQuality: 'Good' | 'Fair' | 'Poor';
  lighting: boolean;
  occupancy: boolean;
  windowOpen: boolean;
  doorOpen: boolean;
  emergency: boolean;
  lastCleaned: number;
  visitsToday: number;
  patient: PatientInfo;
  vitals: Vitals;
  medications: Medication[];
}

interface RoomStore {
  roomData: RoomData;
  alerts: Alert[];
  updateRoomData: (data: Partial<RoomData>) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  dismissAlert: (id: string) => void;
  simulateDataChange: () => void;
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  roomData: {
    temperature: 22,
    airQuality: 'Good',
    lighting: true,
    occupancy: true,
    windowOpen: false,
    doorOpen: false,
    emergency: false,
    lastCleaned: 4,
    visitsToday: 12,
    patient: {
      name: 'Margaret Thompson',
      age: 78,
      roomNumber: '204',
      admissionDate: 'Jan 15, 2024',
      conditions: ['Diabetes', 'Hypertension'],
      emergencyContact: '+1 (555) 123-4567'
    },
    vitals: {
      heartRate: 72,
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      oxygenSaturation: 98,
      respiratoryRate: 16,
      bodyTemperature: 36.8
    },
    medications: [
      {
        id: '1',
        name: 'Aspirin',
        dosage: '75mg',
        time: '08:00',
        status: 'taken'
      },
      {
        id: '2',
        name: 'Metformin',
        dosage: '500mg',
        time: '12:00',
        status: 'taken'
      },
      {
        id: '3',
        name: 'Lisinopril',
        dosage: '10mg',
        time: '15:00',
        status: 'due'
      },
      {
        id: '4',
        name: 'Metformin',
        dosage: '500mg',
        time: '18:00',
        status: 'upcoming'
      },
      {
        id: '5',
        name: 'Aspirin',
        dosage: '75mg',
        time: '20:00',
        status: 'upcoming'
      }
    ]
  },
  alerts: [],

  updateRoomData: (data) => set((state) => ({
    roomData: { ...state.roomData, ...data }
  })),

  addAlert: (alert) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    
    set((state) => ({
      alerts: [newAlert, ...state.alerts.slice(0, 4)] // Keep only 5 recent alerts
    }));
  },

  dismissAlert: (id) => set((state) => ({
    alerts: state.alerts.filter(alert => alert.id !== id)
  })),

  simulateDataChange: () => {
    const { roomData } = get();
    const changes: Partial<RoomData> = {};
    
    // Simulate temperature fluctuations
    const tempChange = (Math.random() - 0.5) * 2;
    changes.temperature = Math.max(18, Math.min(26, roomData.temperature + tempChange));
    
    // Simulate random events
    if (Math.random() < 0.1) {
      changes.windowOpen = !roomData.windowOpen;
      get().addAlert({
        type: 'info',
        title: 'Window Status Changed',
        message: `Window is now ${changes.windowOpen ? 'open' : 'closed'}`
      });
    }
    
    if (Math.random() < 0.05) {
      changes.doorOpen = !roomData.doorOpen;
      get().addAlert({
        type: 'info',
        title: 'Door Status Changed',
        message: `Door is now ${changes.doorOpen ? 'open' : 'closed'}`
      });
    }
    
    if (Math.random() < 0.02) {
      changes.emergency = true;
      get().addAlert({
        type: 'error',
        title: 'Emergency Alert',
        message: 'Emergency button pressed!'
      });
      
      // Auto-reset emergency after 10 seconds
      setTimeout(() => {
        get().updateRoomData({ emergency: false });
        get().addAlert({
          type: 'success',
          title: 'Emergency Resolved',
          message: 'Emergency situation has been handled'
        });
      }, 10000);
    }
    
    // Simulate air quality changes
    if (Math.random() < 0.1) {
      const qualities: ('Good' | 'Fair' | 'Poor')[] = ['Good', 'Fair', 'Poor'];
      const newQuality = qualities[Math.floor(Math.random() * qualities.length)];
      if (newQuality !== roomData.airQuality) {
        changes.airQuality = newQuality;
        if (newQuality === 'Poor') {
          get().addAlert({
            type: 'warning',
            title: 'Air Quality Alert',
            message: 'Air quality has deteriorated'
          });
        }
      }
    }
    
    // Simulate occupancy changes
    if (Math.random() < 0.05) {
      changes.occupancy = !roomData.occupancy;
      get().addAlert({
        type: 'info',
        title: 'Occupancy Changed',
        message: `Room is now ${changes.occupancy ? 'occupied' : 'vacant'}`
      });
    }
    
    // Update visits counter
    if (Math.random() < 0.03) {
      changes.visitsToday = roomData.visitsToday + 1;
    }
    
    get().updateRoomData(changes);
  }
}));

// Auto-simulation disabled for manual demo controls
// Uncomment below to enable auto-simulation
// setInterval(() => {
//   useRoomStore.getState().simulateDataChange();
// }, 3000);