import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '@/state/session';
import DoctorProfileCard from '@/components/doctor/DoctorProfileCard';
import NotificationsPanel from '@/components/doctor/NotificationsPanel';
import AppliedJobsList from '@/components/doctor/AppliedJobsList';
import { useSimulatedPolling } from '@/hooks/useSimulatedPolling';

export default function DoctorDashboardPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  useSimulatedPolling(5000);

  useEffect(() => {
    if (!session || session.role !== 'doctor') {
      navigate({ to: '/doctor/login' });
    }
  }, [session, navigate]);

  if (!session || session.role !== 'doctor') {
    return null;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DoctorProfileCard />
          <AppliedJobsList />
        </div>
        <div>
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
}
