import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useSession } from '@/state/session';

export default function DoctorLoginPage() {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setSession({
      role: 'doctor',
      name: 'Dr. John Smith',
      email,
    });
    toast.success('Login successful!');
    navigate({ to: '/doctor/dashboard' });
  };

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
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account?{' '}
                  <Button variant="link" className="p-0 h-auto" onClick={() => navigate({ to: '/doctor/register' })}>
                    Register here
                  </Button>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
