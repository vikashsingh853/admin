import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface RefundRequest {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function Refunds() {
  const [refunds, setRefunds] = useState<RefundRequest[]>([
    {
      id: '1',
      orderId: 'ORD-001',
      customerName: 'John Doe',
      amount: 100.00,
      reason: 'Product not as described',
      status: 'pending',
      createdAt: '2024-04-26',
    },
    // Add more sample data as needed
  ]);

  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessRefund = (refund: RefundRequest, status: 'approved' | 'rejected') => {
    setIsProcessing(true);
    // TODO: Implement refund processing logic
    setTimeout(() => {
      setRefunds(refunds.map(r => 
        r.id === refund.id ? { ...r, status } : r
      ));
      setIsProcessing(false);
      setSelectedRefund(null);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Refund Requests</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refunds.map((refund) => (
              <TableRow key={refund.id}>
                <TableCell>{refund.orderId}</TableCell>
                <TableCell>{refund.customerName}</TableCell>
                <TableCell>${refund.amount.toFixed(2)}</TableCell>
                <TableCell>{refund.reason}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      refund.status === 'approved'
                        ? 'success'
                        : refund.status === 'rejected'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {refund.status}
                  </Badge>
                </TableCell>
                <TableCell>{refund.createdAt}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedRefund(refund)}
                        disabled={refund.status !== 'pending'}
                      >
                        Process
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Process Refund Request</DialogTitle>
                      </DialogHeader>
                      {selectedRefund && (
                        <div className="space-y-4">
                          <div>
                            <Label>Order ID</Label>
                            <Input value={selectedRefund.orderId} disabled />
                          </div>
                          <div>
                            <Label>Customer</Label>
                            <Input value={selectedRefund.customerName} disabled />
                          </div>
                          <div>
                            <Label>Amount</Label>
                            <Input value={`$${selectedRefund.amount.toFixed(2)}`} disabled />
                          </div>
                          <div>
                            <Label>Reason</Label>
                            <Textarea value={selectedRefund.reason} disabled />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="destructive"
                              onClick={() => handleProcessRefund(selectedRefund, 'rejected')}
                              disabled={isProcessing}
                            >
                              Reject
                            </Button>
                            <Button
                              onClick={() => handleProcessRefund(selectedRefund, 'approved')}
                              disabled={isProcessing}
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}