import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Payment {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: string;
  method: string;
}

interface SubscriptionState {
  subscription: {
    selectedPlan: 'monthly' | 'yearly';
    autoRenew: boolean;
  };
  paymentHistory: Payment[];
  selectPlan: (plan: 'monthly' | 'yearly') => void;
  toggleAutoRenew: () => void;
  addPayment: (payment: Payment) => void;
}

export const useSubscriptionPayments = create<SubscriptionState>()(
  persist(
    (set) => ({
      subscription: {
        selectedPlan: 'monthly',
        autoRenew: false,
      },
      paymentHistory: [
        {
          id: '1',
          date: '2024-01-15',
          amount: 999,
          plan: 'monthly',
          status: 'completed',
          method: 'upi',
        },
      ],
      selectPlan: (plan) =>
        set((state) => ({
          subscription: { ...state.subscription, selectedPlan: plan },
        })),
      toggleAutoRenew: () =>
        set((state) => ({
          subscription: { ...state.subscription, autoRenew: !state.subscription.autoRenew },
        })),
      addPayment: (payment) =>
        set((state) => ({
          paymentHistory: [payment, ...state.paymentHistory],
        })),
    }),
    {
      name: 'doc-c-subscription',
    }
  )
);
