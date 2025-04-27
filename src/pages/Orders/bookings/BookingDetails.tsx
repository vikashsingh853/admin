import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - in a real app, this would come from an API
const mockBookings = [
    {
        id: 1,
        bookingId: "BK001",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "+1 234-567-8900",
        service: "Home Cleaning",
        date: "2024-03-20",
        time: "10:00 AM",
        status: "Confirmed",
        amount: "$100",
        paymentStatus: "Paid",
        address: "123 Main St, City, State 12345",
        notes: "Please bring extra cleaning supplies",
        createdAt: "2024-03-15T10:00:00Z",
        assignedTo: "Clean Team A"
    },
    {
        id: 2,
        bookingId: "BK002",
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        customerPhone: "+1 234-567-8901",
        service: "Plumbing",
        date: "2024-03-21",
        time: "02:30 PM",
        status: "Pending",
        amount: "$150",
        paymentStatus: "Pending",
        address: "456 Oak Ave, City, State 12345",
        notes: "Kitchen sink needs repair",
        createdAt: "2024-03-16T14:30:00Z",
        assignedTo: "Plumber Team B"
    },
    {
        id: 3,
        bookingId: "BK003",
        customerName: "Mike Johnson",
        customerEmail: "mike@example.com",
        customerPhone: "+1 234-567-8902",
        service: "Electrical",
        date: "2024-03-22",
        time: "11:00 AM",
        status: "Completed",
        amount: "$200",
        paymentStatus: "Paid",
        address: "789 Pine Rd, City, State 12345",
        notes: "Install new light fixtures",
        createdAt: "2024-03-17T09:15:00Z",
        assignedTo: "Electric Team C"
    },
    {
        id: 4,
        bookingId: "BK004",
        customerName: "Sarah Williams",
        customerEmail: "sarah@example.com",
        customerPhone: "+1 234-567-8903",
        service: "Carpentry",
        date: "2024-03-23",
        time: "09:00 AM",
        status: "Cancelled",
        amount: "$180",
        paymentStatus: "Refunded",
        address: "321 Elm St, City, State 12345",
        notes: "Custom cabinet installation",
        createdAt: "2024-03-18T11:45:00Z",
        assignedTo: "Carpentry Team D"
    }
];

const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const booking = mockBookings.find(b => b.id === Number(id));

    if (!booking) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Booking not found</h1>
                <Button onClick={() => navigate('/orders/bookings')} className="mt-4">
                    Back to Bookings
                </Button>
            </div>
        );
    }

    return (<>
        <div className="space-y-6 p-6">
            <div className="flex items-center gap-4">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate('/orders/bookings')}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-semibold">Booking Details</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Booking Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Booking ID</p>
                                <p className="font-medium">{booking.bookingId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <p className="font-medium">{booking.status}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Service</p>
                                <p className="font-medium">{booking.service}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Date & Time</p>
                                <p className="font-medium">{booking.date} at {booking.time}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Amount</p>
                                <p className="font-medium">{booking.amount}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Payment Status</p>
                                <p className="font-medium">{booking.paymentStatus}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{booking.customerName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{booking.customerEmail}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{booking.customerPhone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Address</p>
                                <p className="font-medium">{booking.address}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Assigned To</p>
                                <p className="font-medium">{booking.assignedTo}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Created At</p>
                                <p className="font-medium">{new Date(booking.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Notes</p>
                            <p className="font-medium">{booking.notes}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-4">
                <Button onClick={() => navigate(`/orders/bookings/form/edit/${booking.id}`)}>
                    Edit Booking
                </Button>
                <Button 
                    variant="destructive" 
                    onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this booking?')) {
                            alert(`Booking ${booking.bookingId} cancelled`);
                            navigate('/orders/bookings');
                        }
                    }}
                >
                    Cancel Booking
                </Button>
            </div>
        </div>
       
    </>

    );
};

export default BookingDetails; 