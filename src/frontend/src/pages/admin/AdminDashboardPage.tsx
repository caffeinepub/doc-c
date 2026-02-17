import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '@/state/session';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, CreditCard, CheckCircle } from 'lucide-react';
import { useAdminData } from '@/state/adminData';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { doctors, hospitals, payments } = useAdminData();

  useEffect(() => {
    if (!session || session.role !== 'admin') {
      navigate({ to: '/' });
    }
  }, [session, navigate]);

  if (!session || session.role !== 'admin') {
    return null;
  }

  const pendingDoctors = doctors.filter((d) => d.approvalStatus === 'pending').length;
  const pendingHospitals = hospitals.filter((h) => h.approvalStatus === 'pending').length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">System Administrator Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctors.length}</div>
            <p className="text-xs text-muted-foreground">{pendingDoctors} pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hospitals</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospitals.length}</div>
            <p className="text-xs text-muted-foreground">{pendingHospitals} pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From subscriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospitals.filter((h) => h.subscribed).length}</div>
            <p className="text-xs text-muted-foreground">Paying hospitals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button
              onClick={() => navigate({ to: '/admin/doctors' })}
              className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-medium">Manage Doctors</div>
              <div className="text-sm text-muted-foreground">Approve or reject doctor registrations</div>
            </button>
            <button
              onClick={() => navigate({ to: '/admin/hospitals' })}
              className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-medium">Manage Hospitals</div>
              <div className="text-sm text-muted-foreground">Approve or reject hospital registrations</div>
            </button>
            <button
              onClick={() => navigate({ to: '/admin/subscriptions' })}
              className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-medium">Subscription Plans</div>
              <div className="text-sm text-muted-foreground">Manage pricing and plan features</div>
            </button>
            <button
              onClick={() => navigate({ to: '/admin/payments' })}
              className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-medium">Monitor Payments</div>
              <div className="text-sm text-muted-foreground">View all payment transactions</div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span>New doctor registration</span>
                <span className="text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Hospital subscription renewed</span>
                <span className="text-muted-foreground">5 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Doctor profile approved</span>
                <span className="text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span>New hospital registration</span>
                <span className="text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
