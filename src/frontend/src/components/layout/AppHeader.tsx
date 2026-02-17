import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useSession } from '@/state/session';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useCurrentUserProfile';
import { useQueryClient } from '@tanstack/react-query';

export default function AppHeader() {
  const navigate = useNavigate();
  const { session, clearSession } = useSession();
  const { identity, clear: clearIdentity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const isAuthenticatedWithII = !!identity;
  const displayName = isAuthenticatedWithII && userProfile ? userProfile.name : session?.name;

  const handleLogout = async () => {
    if (isAuthenticatedWithII) {
      await clearIdentity();
      queryClient.clear();
      navigate({ to: '/doctor/login' });
    } else {
      clearSession();
      navigate({ to: '/' });
    }
  };

  const NavLinks = () => (
    <>
      {!session && !isAuthenticatedWithII && (
        <>
          <Link to="/doctor/login" className="text-sm font-medium hover:text-primary transition-colors">
            Doctor Login
          </Link>
          <Link to="/hospital/register" className="text-sm font-medium hover:text-primary transition-colors">
            Hospital
          </Link>
        </>
      )}
      {isAuthenticatedWithII && userProfile?.profileType === 'doctor' && (
        <Link to="/doctor/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
          Dashboard
        </Link>
      )}
      {session?.role === 'hospital' && (
        <>
          <Link to="/hospital/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/hospital/analytics" className="text-sm font-medium hover:text-primary transition-colors">
            Analytics
          </Link>
          <Link to="/hospital/subscription" className="text-sm font-medium hover:text-primary transition-colors">
            Subscription
          </Link>
        </>
      )}
      {session?.role === 'admin' && (
        <>
          <Link to="/admin/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Admin
          </Link>
          <Link to="/admin/doctors" className="text-sm font-medium hover:text-primary transition-colors">
            Doctors
          </Link>
          <Link to="/admin/hospitals" className="text-sm font-medium hover:text-primary transition-colors">
            Hospitals
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/assets/generated/doc-c-logo.dim_512x512.png" alt="DOC C" className="h-10 w-10" />
          <span className="text-xl font-bold text-primary">DOC C</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks />
          {(session || isAuthenticatedWithII) && displayName && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{displayName}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-8">
              <NavLinks />
              {(session || isAuthenticatedWithII) && displayName && (
                <>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">{displayName}</p>
                    <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                      Logout
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
