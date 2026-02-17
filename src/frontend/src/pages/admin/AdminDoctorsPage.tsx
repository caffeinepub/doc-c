import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '@/state/session';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminData } from '@/state/adminData';
import { toast } from 'sonner';

export default function AdminDoctorsPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { doctors, approveDoctor, rejectDoctor } = useAdminData();

  useEffect(() => {
    if (!session || session.role !== 'admin') {
      navigate({ to: '/' });
    }
  }, [session, navigate]);

  if (!session || session.role !== 'admin') {
    return null;
  }

  const handleApprove = (id: string) => {
    approveDoctor(id);
    toast.success('Doctor approved successfully');
  };

  const handleReject = (id: string) => {
    rejectDoctor(id);
    toast.success('Doctor rejected');
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Doctors</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Registered Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.experience} years</TableCell>
                  <TableCell>{doctor.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        doctor.approvalStatus === 'approved'
                          ? 'default'
                          : doctor.approvalStatus === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {doctor.approvalStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {doctor.approvalStatus === 'pending' && (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleApprove(doctor.id)}>
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(doctor.id)}>
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
