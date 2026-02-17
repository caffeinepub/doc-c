import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Heart } from 'lucide-react';
import EditDoctorProfileDialog from './EditDoctorProfileDialog';
import { useDoctorProfile } from '@/state/doctorProfile';

export default function DoctorProfileCard() {
  const { profile, toggleAvailability } = useDoctorProfile();
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              <img
                src={profile.photo || 'https://via.placeholder.com/150'}
                alt={profile.name}
                className="h-32 w-32 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{profile.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="relative">
                    <Heart className="h-8 w-8 text-primary fill-primary animate-pulse" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {profile.specialization.substring(0, 3)}
                    </span>
                  </div>
                  <span className="text-lg font-medium">{profile.specialization}</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{profile.experience} years experience</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Switch id="availability" checked={profile.available} onCheckedChange={toggleAvailability} />
                  <Label htmlFor="availability" className={profile.available ? 'text-green-600 font-semibold' : ''}>
                    {profile.available ? 'Available' : 'Not Available'}
                  </Label>
                </div>
                <Button variant="outline" onClick={() => setShowEditDialog(true)}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <EditDoctorProfileDialog open={showEditDialog} onOpenChange={setShowEditDialog} />
    </>
  );
}
