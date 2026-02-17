import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DoctorProfile {
  name: string;
  specialization: string;
  experience: number;
  location: string;
  available: boolean;
  photo: string | null;
}

interface DoctorProfileState {
  profile: DoctorProfile;
  updateProfile: (updates: Partial<DoctorProfile>) => void;
  toggleAvailability: () => void;
}

export const useDoctorProfile = create<DoctorProfileState>()(
  persist(
    (set) => ({
      profile: {
        name: 'Dr. John Smith',
        specialization: 'Cardiology',
        experience: 10,
        location: 'New York, NY',
        available: true,
        photo: null,
      },
      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
      toggleAvailability: () =>
        set((state) => ({
          profile: { ...state.profile, available: !state.profile.available },
        })),
    }),
    {
      name: 'doc-c-doctor-profile',
    }
  )
);
