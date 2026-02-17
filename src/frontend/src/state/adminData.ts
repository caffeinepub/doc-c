import { create } from 'zustand';

interface AdminDoctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  location: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

interface AdminHospital {
  id: string;
  name: string;
  location: string;
  departments: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  subscribed: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

interface AdminPayment {
  id: string;
  date: string;
  hospitalName: string;
  amount: number;
  plan: string;
  method: string;
  status: string;
}

interface AdminDataState {
  doctors: AdminDoctor[];
  hospitals: AdminHospital[];
  subscriptionPlans: SubscriptionPlan[];
  payments: AdminPayment[];
  approveDoctor: (id: string) => void;
  rejectDoctor: (id: string) => void;
  approveHospital: (id: string) => void;
  rejectHospital: (id: string) => void;
  addPlan: (plan: SubscriptionPlan) => void;
  updatePlan: (id: string, updates: Partial<SubscriptionPlan>) => void;
  removePlan: (id: string) => void;
}

export const useAdminData = create<AdminDataState>((set) => ({
  doctors: [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      experience: 12,
      location: 'New York, NY',
      approvalStatus: 'pending',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Neurology',
      experience: 8,
      location: 'Los Angeles, CA',
      approvalStatus: 'approved',
    },
  ],
  hospitals: [
    {
      id: '1',
      name: 'City General Hospital',
      location: 'New York, NY',
      departments: 'Cardiology, Emergency, Surgery',
      approvalStatus: 'approved',
      subscribed: true,
    },
    {
      id: '2',
      name: 'Metro Medical Center',
      location: 'Chicago, IL',
      departments: 'Pediatrics, Orthopedics',
      approvalStatus: 'pending',
      subscribed: false,
    },
  ],
  subscriptionPlans: [
    {
      id: '1',
      name: 'Monthly Premium',
      price: 999,
      duration: '1 month',
      features: ['Unlimited searches', 'Analytics', 'Emergency mode'],
    },
    {
      id: '2',
      name: 'Yearly Premium',
      price: 9999,
      duration: '1 year',
      features: ['All monthly features', 'Priority support', 'Advanced analytics'],
    },
  ],
  payments: [
    {
      id: '1',
      date: '2024-02-15',
      hospitalName: 'City General Hospital',
      amount: 999,
      plan: 'monthly',
      method: 'upi',
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-02-10',
      hospitalName: 'Metro Medical Center',
      amount: 9999,
      plan: 'yearly',
      method: 'card',
      status: 'completed',
    },
  ],
  approveDoctor: (id) =>
    set((state) => ({
      doctors: state.doctors.map((d) => (d.id === id ? { ...d, approvalStatus: 'approved' as const } : d)),
    })),
  rejectDoctor: (id) =>
    set((state) => ({
      doctors: state.doctors.map((d) => (d.id === id ? { ...d, approvalStatus: 'rejected' as const } : d)),
    })),
  approveHospital: (id) =>
    set((state) => ({
      hospitals: state.hospitals.map((h) => (h.id === id ? { ...h, approvalStatus: 'approved' as const } : h)),
    })),
  rejectHospital: (id) =>
    set((state) => ({
      hospitals: state.hospitals.map((h) => (h.id === id ? { ...h, approvalStatus: 'rejected' as const } : h)),
    })),
  addPlan: (plan) =>
    set((state) => ({
      subscriptionPlans: [...state.subscriptionPlans, plan],
    })),
  updatePlan: (id, updates) =>
    set((state) => ({
      subscriptionPlans: state.subscriptionPlans.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  removePlan: (id) =>
    set((state) => ({
      subscriptionPlans: state.subscriptionPlans.filter((p) => p.id !== id),
    })),
}));
