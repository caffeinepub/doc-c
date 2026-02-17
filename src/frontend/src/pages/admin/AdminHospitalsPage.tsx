import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '@/state/session';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminData } from '@/state/adminData';
import { toast } from 'sonner';

export default function AdminHospitalsPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { hospitals, approveHospital, rejectHospital } = useAdminData();

  useEffect(() => {
    if (!session || session.role !== 'admin') {
      navigate({ to: '/' });
    }
  }, [session, navigate]);

  if (!session || session.role !== 'admin') {
    return null;
  }

  const handleApprove = (id: string) => {
    approveHospital(id);
    toast.success('Hospital approved successfully');
  };

  const handleReject = (id: string) => {
    rejectHospital(id);
    toast.success('Hospital rejected');
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Hospitals</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Registered Hospitals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Departments</TableHead>
                <TableHead>Subscribed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">{hospital.name}</TableCell>
                  <TableCell>{hospital.location}</TableCell>
                  <TableCell>{hospital.departments}</TableCell>
                  <TableCell>
                    <Badge variant={hospital.subscribed ? 'default' : 'secondary'}>
                      {hospital.subscribed ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        hospital.approvalStatus === 'approved'
                          ? 'default'
                          : hospital.approvalStatus === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {hospital.approvalStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {hospital.approvalStatus === 'pending' && (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleApprove(hospital.id)}>
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(hospital.id)}>
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
