import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Session {
  role: 'hospital' | 'admin';
  name: string;
  email: string;
}

interface SessionState {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: 'doc-c-session',
    }
  )
);
