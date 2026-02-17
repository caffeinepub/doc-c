import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card p-8 rounded-lg shadow-lg text-center space-y-4 animate-in zoom-in">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold">Payment Successful!</h2>
        <p className="text-muted-foreground">Your subscription has been activated</p>
      </div>
    </div>
  );
}
