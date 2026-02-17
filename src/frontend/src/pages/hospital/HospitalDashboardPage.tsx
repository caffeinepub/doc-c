import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '@/state/session';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Users, Activity, Briefcase } from 'lucide-react';
import DoctorSearchFilters from '@/components/hospital/DoctorSearchFilters';
import DoctorList from '@/components/hospital/DoctorList';
import { useEmergencyMode } from '@/state/emergencyMode';
import { useSimulatedPolling } from '@/hooks/useSimulatedPolling';
import { useSeedData } from '@/state/seedData';

export default function HospitalDashboardPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { emergencyMode, toggleEmergencyMode } = useEmergencyMode();
  const { doctors } = useSeedData();
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  useSimulatedPolling(5000);

  useEffect(() => {
    if (!session || session.role !== 'hospital') {
      navigate({ to: '/hospital/register' });
    }
  }, [session, navigate]);

  if (!session || session.role !== 'hospital') {
    return null;
  }

  const availableDoctors = doctors.filter((d) => d.available);

  return (
    <div className={`container py-8 transition-colors ${emergencyMode ? 'bg-destructive/5' : ''}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Switch id="emergency-mode" checked={emergencyMode} onCheckedChange={toggleEmergencyMode} />
          <Label htmlFor="emergency-mode" className={emergencyMode ? 'text-destructive font-semibold' : ''}>
            Emergency Mode
          </Label>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className={emergencyMode ? 'border-destructive' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors Available</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableDoctors.length}</div>
            <p className="text-xs text-muted-foreground">Ready to connect</p>
          </CardContent>
        </Card>
        <Card className={emergencyMode ? 'border-destructive' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Cases</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active this week</p>
          </CardContent>
        </Card>
        <Card className={emergencyMode ? 'border-destructive' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Hires</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending responses</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <DoctorSearchFilters doctors={doctors} onFilteredResults={setFilteredDoctors} />

      {/* Doctor List */}
      <DoctorList doctors={filteredDoctors} emergencyMode={emergencyMode} />
    </div>
  );
}
