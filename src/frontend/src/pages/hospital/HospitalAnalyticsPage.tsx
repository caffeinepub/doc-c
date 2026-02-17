import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '@/state/session';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResponsiveCharts from '@/components/analytics/ResponsiveCharts';
import { useAnalyticsSampleData } from '@/state/analyticsSampleData';
import { TrendingUp, Users, Clock } from 'lucide-react';

export default function HospitalAnalyticsPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { emergencyTrends, doctorAvailability, insights } = useAnalyticsSampleData();

  useEffect(() => {
    if (!session || session.role !== 'hospital') {
      navigate({ to: '/hospital/register' });
    }
  }, [session, navigate]);

  if (!session || session.role !== 'hospital') {
    return null;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Performance Insights */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">15% faster than last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hire Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.hireSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">Above industry average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.activeDoctors}</div>
            <p className="text-xs text-muted-foreground">In your network</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Trends</CardTitle>
            <CardDescription>Monthly emergency case volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveCharts data={emergencyTrends} type="line" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Doctor Availability</CardTitle>
            <CardDescription>Available doctors by specialization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveCharts data={doctorAvailability} type="bar" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
