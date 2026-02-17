import { create } from 'zustand';
import { useNotifications } from './notifications';

interface HireRequest {
  id: string;
  doctorId: string;
  hospitalName: string;
  details: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}

interface WorkflowsState {
  hireRequests: HireRequest[];
  sendHireRequest: (doctorId: string, doctorName: string, details: string) => void;
  respondToRequest: (id: string, response: 'accepted' | 'rejected') => void;
}

export const useWorkflows = create<WorkflowsState>((set) => ({
  hireRequests: [],
  sendHireRequest: (doctorId, doctorName, details) => {
    const newRequest: HireRequest = {
      id: Date.now().toString(),
      doctorId,
      hospitalName: 'City General Hospital',
      details,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    set((state) => ({
      hireRequests: [newRequest, ...state.hireRequests],
    }));

    // Add notification for doctor
    useNotifications.getState().addNotification({
      message: `New hire request from City General Hospital`,
      type: 'match',
    });
  },
  respondToRequest: (id, response) =>
    set((state) => ({
      hireRequests: state.hireRequests.map((req) => (req.id === id ? { ...req, status: response } : req)),
    })),
}));
