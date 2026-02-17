import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function DoctorRegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Doctor Registration</CardTitle>
            <CardDescription>Create your professional profile to connect with hospitals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Method Not Supported</AlertTitle>
              <AlertDescription>
                Firebase Phone Authentication (SMS OTP + reCAPTCHA) and Firestore are not supported in this environment.
                This application uses Internet Identity for secure, decentralized authentication.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To register as a doctor, please use Internet Identity authentication. This provides a secure,
                privacy-preserving way to authenticate without relying on traditional phone numbers or passwords.
              </p>
              
              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate({ to: '/doctor/login' })} className="w-full">
                  Sign In with Internet Identity
                </Button>
                <Button onClick={() => navigate({ to: '/' })} variant="outline" className="w-full">
                  Back to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
