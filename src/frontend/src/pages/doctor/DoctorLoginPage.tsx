import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useCurrentUserProfile';
import ProfileSetupDialog from '@/components/auth/ProfileSetupDialog';

export default function DoctorLoginPage() {
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  useEffect(() => {
    if (isAuthenticated && isFetched && !profileLoading) {
      if (userProfile === null) {
        setShowProfileSetup(true);
      } else if (userProfile && userProfile.profileType === 'doctor') {
        navigate({ to: '/doctor/dashboard' });
      }
    }
  }, [isAuthenticated, userProfile, profileLoading, isFetched, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  const handleProfileComplete = () => {
    setShowProfileSetup(false);
    navigate({ to: '/doctor/dashboard' });
  };

  if (isInitializing) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12"
      style={{
        backgroundImage: 'url(/assets/generated/doc-c-hero.dim_1600x600.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className="max-w-md mx-auto">
          <Card className="backdrop-blur-sm bg-background/95">
            <CardHeader>
              <CardTitle className="text-2xl">Doctor Login</CardTitle>
              <CardDescription>Access your professional dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authentication Method</AlertTitle>
                <AlertDescription>
                  Firebase Phone Authentication (SMS OTP + reCAPTCHA) and Firestore are not supported.
                  Please use Internet Identity for secure authentication.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Internet Identity provides secure, decentralized authentication without requiring passwords or phone numbers.
                </p>
                
                <Button 
                  onClick={handleLogin} 
                  className="w-full" 
                  disabled={isLoggingIn || isAuthenticated}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {isLoggingIn ? 'Signing In...' : isAuthenticated ? 'Signed In' : 'Sign In with Internet Identity'}
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  New to DOC C?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => navigate({ to: '/doctor/register' })}
                  >
                    Learn more about registration
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProfileSetupDialog open={showProfileSetup} onComplete={handleProfileComplete} />
    </div>
  );
}
