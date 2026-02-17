import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWorkflows } from '@/state/workflows';
import { toast } from 'sonner';

export default function AppliedJobsList() {
  const { hireRequests, respondToRequest } = useWorkflows();

  const handleAccept = (id: string) => {
    respondToRequest(id, 'accepted');
    toast.success('Hire request accepted!');
  };

  const handleReject = (id: string) => {
    respondToRequest(id, 'rejected');
    toast.success('Hire request rejected');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applied Jobs & Hire Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hireRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No hire requests yet</p>
          ) : (
            hireRequests.map((request) => (
              <div key={request.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{request.hospitalName}</h4>
                    <p className="text-sm text-muted-foreground">{request.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(request.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge
                    variant={
                      request.status === 'accepted'
                        ? 'default'
                        : request.status === 'rejected'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
                {request.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleAccept(request.id)}>
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReject(request.id)}>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
