import { create } from 'zustand';

interface EmergencyModeState {
  emergencyMode: boolean;
  toggleEmergencyMode: () => void;
}

export const useEmergencyMode = create<EmergencyModeState>((set) => ({
  emergencyMode: false,
  toggleEmergencyMode: () => set((state) => ({ emergencyMode: !state.emergencyMode })),
}));
