import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import {  useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

// Mock data for bookings - in a real app, this would come from an API
const mockBookings = [
    {
        id: 1,
        bookingId: "BK001",
        customerName: "John Doe",
        service: "Home Cleaning",
        date: "2024-03-20",
        time: "10:00 AM",
        status: "Confirmed",
        amount: "$100",
        paymentStatus: "Paid"
    },
    {
        id: 2,
        bookingId: "BK002",
        customerName: "Jane Smith",
        service: "Plumbing",
        date: "2024-03-21",
        time: "02:30 PM",
        status: "Pending",
        amount: "$150",
        paymentStatus: "Pending"
    },
    {
        id: 3,
        bookingId: "BK003",
        customerName: "Mike Johnson",
        service: "Electrical",
        date: "2024-03-22",
        time: "11:00 AM",
        status: "Completed",
        amount: "$200",
        paymentStatus: "Paid"
    },
    {
        id: 4,
        bookingId: "BK004",
        customerName: "Sarah Williams",
        service: "Carpentry",
        date: "2024-03-23",
        time: "09:00 AM",
        status: "Cancelled",
        amount: "$180",
        paymentStatus: "Refunded"
    }
];

const Bookings = () => {
    const navigate = useNavigate();
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const handleAccept = () => {
        if (selectedBooking) {
            // Here you would typically make an API call to update the booking status
            alert(`Booking ${selectedBooking.bookingId} accepted`);
            setShowAcceptModal(false);
            setSelectedBooking(null);
        }
    };

    const handleCancel = () => {
        if (selectedBooking) {
            // Here you would typically make an API call to update the booking status
            alert(`Booking ${selectedBooking.bookingId} cancelled`);
            setShowCancelModal(false);
            setSelectedBooking(null);
        }
    };

    return (<>
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Bookings</h1>
                <Button onClick={() => navigate('/orders/bookings/form/create')}>
                    Add New Booking
                </Button>
            </div>

            <DataTable
                data={mockBookings}
                actions={(row) => [
                    { 
                        label: "View Details", 
                        onClick: () => navigate(`/orders/bookings/${row.id}`) 
                    },
                    { 
                        label: row.status === 'Pending' ? 'Accept' : row.status === 'Confirmed' ? 'Cancel' : 'View Status',
                        onClick: () => {
                            setSelectedBooking(row);
                            if (row.status === 'Pending') {
                                setShowAcceptModal(true);
                            } else if (row.status === 'Confirmed') {
                                setShowCancelModal(true);
                            } else {
                                setShowStatusModal(true);
                            }
                        }
                    }
                ]}
                mandatoryKeys={['bookingId', 'customerName', 'service', 'status']}
                shownKeys={['date', 'time', 'amount', 'paymentStatus']}
                filterKeys={['bookingId', 'customerName', 'service', 'status', 'paymentStatus']}
            />

            {/* Accept Booking Modal */}
            <Dialog open={showAcceptModal} onOpenChange={setShowAcceptModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Accept Booking</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to accept this booking?
                        </DialogDescription>
                    </DialogHeader>
                    {selectedBooking && (
                        <div className="space-y-2">
                            <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
                            <p><strong>Customer:</strong> {selectedBooking.customerName}</p>
                            <p><strong>Service:</strong> {selectedBooking.service}</p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAcceptModal(false)}>Cancel</Button>
                        <Button onClick={handleAccept}>Accept Booking</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Cancel Booking Modal */}
            <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancel Booking</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel this booking?
                        </DialogDescription>
                    </DialogHeader>
                    {selectedBooking && (
                        <div className="space-y-2">
                            <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
                            <p><strong>Customer:</strong> {selectedBooking.customerName}</p>
                            <p><strong>Service:</strong> {selectedBooking.service}</p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCancelModal(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleCancel}>Cancel Booking</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Status Modal */}
            <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Booking Status</DialogTitle>
                        <DialogDescription>
                            Current status of the booking
                        </DialogDescription>
                    </DialogHeader>
                    {selectedBooking && (
                        <div className="space-y-2">
                            <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
                            <p><strong>Customer:</strong> {selectedBooking.customerName}</p>
                            <p><strong>Service:</strong> {selectedBooking.service}</p>
                            <p><strong>Status:</strong> {selectedBooking.status}</p>
                            <p><strong>Payment Status:</strong> {selectedBooking.paymentStatus}</p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowStatusModal(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </>

    );
};

export default Bookings;