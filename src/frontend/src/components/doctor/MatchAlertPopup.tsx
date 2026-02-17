import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/state/notifications';
import { Heart } from 'lucide-react';

export default function MatchAlertPopup() {
  const { notifications, markAsRead } = useNotifications();
  const [currentAlert, setCurrentAlert] = useState<any>(null);

  useEffect(() => {
    const unreadMatch = notifications.find((n) => !n.read && n.type === 'match');
    if (unreadMatch) {
      setCurrentAlert(unreadMatch);
    }
  }, [notifications]);

  const handleClose = () => {
    if (currentAlert) {
      markAsRead(currentAlert.id);
    }
    setCurrentAlert(null);
  };

  return (
    <Dialog open={!!currentAlert} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-primary fill-primary animate-pulse" />
          </div>
          <DialogTitle className="text-center text-2xl">New Match Found!</DialogTitle>
          <DialogDescription className="text-center">
            {currentAlert?.message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Button onClick={handleClose}>View Details</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
