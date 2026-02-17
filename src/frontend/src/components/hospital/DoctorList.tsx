import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase } from 'lucide-react';
import { useWorkflows } from '@/state/workflows';
import { toast } from 'sonner';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  location: string;
  available: boolean;
  photo?: string;
}

interface Props {
  doctors: Doctor[];
  emergencyMode: boolean;
}

export default function DoctorList({ doctors, emergencyMode }: Props) {
  const { sendHireRequest } = useWorkflows();

  const handleHire = (doctor: Doctor) => {
    sendHireRequest(doctor.id, doctor.name, `Hire request for ${doctor.specialization}`);
    toast.success(`Hire request sent to ${doctor.name}`);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.length === 0 ? (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          No doctors found matching your criteria
        </div>
      ) : (
        doctors.map((doctor) => (
          <Card key={doctor.id} className={emergencyMode ? 'border-destructive' : ''}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={doctor.photo || 'https://via.placeholder.com/150'}
                  alt={doctor.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div className="text-center space-y-2 w-full">
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <Badge variant="secondary">{doctor.specialization}</Badge>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{doctor.experience}y</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{doctor.location}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Badge variant={doctor.available ? 'default' : 'secondary'}>
                      {doctor.available ? 'Available' : 'Not Available'}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => handleHire(doctor)}
                  className="w-full"
                  variant={emergencyMode ? 'destructive' : 'default'}
                  disabled={!doctor.available}
                >
                  {emergencyMode ? 'Emergency Hire' : 'Send Hire Request'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
