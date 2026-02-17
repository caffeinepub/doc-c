import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useCurrentUserProfile';
import PremiumDoctorProfileDashboard from '@/components/doctor/PremiumDoctorProfileDashboard';
import ProfileSetupDialog from '@/components/auth/ProfileSetupDialog';

export default function DoctorDashboardPage() {
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: '/doctor/login' });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  useEffect(() => {
    if (isAuthenticated && isFetched && !profileLoading) {
      if (userProfile === null) {
        setShowProfileSetup(true);
      } else if (userProfile && userProfile.profileType !== 'doctor') {
        navigate({ to: '/doctor/login' });
      }
    }
  }, [isAuthenticated, userProfile, profileLoading, isFetched, navigate]);

  const handleProfileComplete = () => {
    setShowProfileSetup(false);
  };

  if (isInitializing || !isAuthenticated) {
    return null;
  }

  if (profileLoading || !isFetched) {
    return (
      <div className="container py-8">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!userProfile || userProfile.profileType !== 'doctor') {
    return null;
  }

  return (
    <>
      <PremiumDoctorProfileDashboard />
      <ProfileSetupDialog open={showProfileSetup} onComplete={handleProfileComplete} />
    </>
  );
}
