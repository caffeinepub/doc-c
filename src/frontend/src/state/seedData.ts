import { create } from 'zustand';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  location: string;
  available: boolean;
  photo?: string;
}

interface SeedDataState {
  doctors: Doctor[];
}

export const useSeedData = create<SeedDataState>(() => ({
  doctors: [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      experience: 12,
      location: 'New York, NY',
      available: true,
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Neurology',
      experience: 8,
      location: 'Los Angeles, CA',
      available: true,
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialization: 'Pediatrics',
      experience: 15,
      location: 'Chicago, IL',
      available: false,
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialization: 'Orthopedics',
      experience: 10,
      location: 'Houston, TX',
      available: true,
    },
    {
      id: '5',
      name: 'Dr. Lisa Anderson',
      specialization: 'Dermatology',
      experience: 7,
      location: 'Phoenix, AZ',
      available: true,
    },
    {
      id: '6',
      name: 'Dr. Robert Taylor',
      specialization: 'Psychiatry',
      experience: 20,
      location: 'Philadelphia, PA',
      available: false,
    },
  ],
}));
