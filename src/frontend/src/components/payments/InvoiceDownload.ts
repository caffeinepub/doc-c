interface Payment {
  id: string;
  date: string;
  amount: number;
  plan: string;
  method: string;
}

export function downloadInvoice(payment: Payment) {
  const invoiceContent = `
DOC C - Invoice
================

Invoice ID: ${payment.id}
Date: ${new Date(payment.date).toLocaleDateString()}
Plan: ${payment.plan}
Amount: ₹${payment.amount}
Payment Method: ${payment.method.toUpperCase()}

Thank you for your subscription!
  `.trim();

  const blob = new Blob([invoiceContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-${payment.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
