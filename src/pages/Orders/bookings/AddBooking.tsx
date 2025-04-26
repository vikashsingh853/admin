import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";


const AddBooking = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        service: '',
        date: '',
        time: '',
        address: '',
        notes: '',
        amount: '',
        status: 'Pending' // Default status for new bookings
    });

    const validateForm = () => {
        if (!formData.customerName.trim()) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Customer name is required"
            });
            return false;
        }
        if (!formData.customerEmail.trim()) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Email is required"
            });
            return false;
        }
        if (!formData.customerPhone.trim()) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Phone number is required"
            });
            return false;
        }
        if (!formData.service) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please select a service"
            });
            return false;
        }
        if (!formData.date) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Date is required"
            });
            return false;
        }
        if (!formData.time) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Time is required"
            });
            return false;
        }
        if (!formData.amount) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Amount is required"
            });
            return false;
        }
        if (!formData.address.trim()) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Address is required"
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            toast({
                title: "Success",
                description: "Booking created successfully!",
                variant: "default"
            });
            
            navigate('/orders/bookings');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create booking. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center gap-4">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate('/orders/bookings')}
                    disabled={isLoading}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-semibold">Add New Booking</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Booking Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="customerName">Customer Name *</Label>
                                <Input
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    placeholder="Enter customer name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="customerEmail">Email *</Label>
                                <Input
                                    id="customerEmail"
                                    name="customerEmail"
                                    type="email"
                                    value={formData.customerEmail}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="customerPhone">Phone *</Label>
                                <Input
                                    id="customerPhone"
                                    name="customerPhone"
                                    value={formData.customerPhone}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="service">Service *</Label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    disabled={isLoading}
                                >
                                    <option value="">Select a service</option>
                                    <option value="Home Cleaning">Home Cleaning</option>
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Carpentry">Carpentry</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date *</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time *</Label>
                                <Input
                                    id="time"
                                    name="time"
                                    type="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount *</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    placeholder="Enter amount"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address *</Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    placeholder="Enter full address"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    placeholder="Any additional notes or instructions"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => navigate('/orders/bookings')}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating..." : "Create Booking"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddBooking; 