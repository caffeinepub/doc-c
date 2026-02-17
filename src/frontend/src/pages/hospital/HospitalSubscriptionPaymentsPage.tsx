import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '@/state/session';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import PaymentSuccessAnimation from '@/components/payments/PaymentSuccessAnimation';
import { downloadInvoice } from '@/components/payments/InvoiceDownload';
import { useSubscriptionPayments } from '@/state/subscriptionPayments';
import { Check } from 'lucide-react';

export default function HospitalSubscriptionPaymentsPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { subscription, paymentHistory, selectPlan, toggleAutoRenew, addPayment } = useSubscriptionPayments();
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    if (!session || session.role !== 'hospital') {
      navigate({ to: '/hospital/register' });
    }
  }, [session, navigate]);

  if (!session || session.role !== 'hospital') {
    return null;
  }

  const handlePayment = () => {
    if (paymentMethod === 'upi' && !upiId) {
      toast.error('Please enter UPI ID');
      return;
    }
    if (paymentMethod === 'card' && !cardNumber) {
      toast.error('Please enter card number');
      return;
    }

    const amount = subscription.selectedPlan === 'monthly' ? 999 : 9999;
    addPayment({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount,
      plan: subscription.selectedPlan,
      status: 'completed',
      method: paymentMethod,
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      toast.success('Payment successful!');
    }, 3000);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Subscription & Payments</h1>

      {showSuccess && <PaymentSuccessAnimation />}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Subscription Plans */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>Select a subscription plan that fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer transition-all ${
                    subscription.selectedPlan === 'monthly' ? 'border-primary ring-2 ring-primary' : ''
                  }`}
                  onClick={() => selectPlan('monthly')}
                >
                  <CardHeader>
                    <CardTitle>Monthly Plan</CardTitle>
                    <div className="text-3xl font-bold">₹999</div>
                    <CardDescription>per month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        Unlimited doctor searches
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        Emergency mode access
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        Analytics dashboard
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all ${
                    subscription.selectedPlan === 'yearly' ? 'border-primary ring-2 ring-primary' : ''
                  }`}
                  onClick={() => selectPlan('yearly')}
                >
                  <CardHeader>
                    <CardTitle>Yearly Plan</CardTitle>
                    <div className="text-3xl font-bold">₹9,999</div>
                    <CardDescription>per year (Save 17%)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        All monthly features
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        Priority support
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        Advanced analytics
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <Switch id="auto-renew" checked={subscription.autoRenew} onCheckedChange={toggleAutoRenew} />
                <Label htmlFor="auto-renew">Enable auto-renewal</Label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you want to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'upi' | 'card')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                  <TabsTrigger value="card">Card</TabsTrigger>
                </TabsList>
                <TabsContent value="upi" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi">UPI ID</Label>
                    <Input
                      id="upi"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <Button onClick={handlePayment} className="w-full">
                    Pay ₹{subscription.selectedPlan === 'monthly' ? '999' : '9,999'}
                  </Button>
                </TabsContent>
                <TabsContent value="card" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card">Card Number</Label>
                    <Input
                      id="card"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <Button onClick={handlePayment} className="w-full">
                    Pay ₹{subscription.selectedPlan === 'monthly' ? '999' : '9,999'}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="text-xs">
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-xs">₹{payment.amount}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadInvoice(payment)}
                        >
                          Invoice
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
