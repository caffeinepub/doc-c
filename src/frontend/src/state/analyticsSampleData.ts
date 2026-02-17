import { create } from 'zustand';

interface DataPoint {
  label: string;
  value: number;
}

interface AnalyticsData {
  emergencyTrends: DataPoint[];
  doctorAvailability: DataPoint[];
  insights: {
    avgResponseTime: string;
    hireSuccessRate: number;
    activeDoctors: number;
  };
}

export const useAnalyticsSampleData = create<AnalyticsData>(() => ({
  emergencyTrends: [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 48 },
    { label: 'Apr', value: 61 },
    { label: 'May', value: 55 },
    { label: 'Jun', value: 67 },
  ],
  doctorAvailability: [
    { label: 'Cardiology', value: 24 },
    { label: 'Neurology', value: 18 },
    { label: 'Pediatrics', value: 32 },
    { label: 'Orthopedics', value: 15 },
    { label: 'Dermatology', value: 21 },
  ],
  insights: {
    avgResponseTime: '2.5 hours',
    hireSuccessRate: 87,
    activeDoctors: 156,
  },
}));
