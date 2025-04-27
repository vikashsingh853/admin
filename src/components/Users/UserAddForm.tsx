import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const UserAddForm = () => {
    const navigate = useNavigate();
    const { mode, id } = useParams();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(mode === 'edit');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (mode === 'edit' && id) {
            const fetchUserData = async () => {
                try {
                    setIsFetching(true);
                    // Here you would typically make an API call to fetch the user data
                    // For now, we'll simulate the API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    // Simulated user data - replace with actual API call
                    const userData = {
                        name: 'John Doe',
                        email: 'john@example.com',
                        role: 'User',
                        password: '', // Don't fetch password
                        confirmPassword: ''
                    };
                    setFormData(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setErrors(prev => ({
                        ...prev,
                        fetch: 'Failed to fetch user data. Please try again.'
                    }));
                } finally {
                    setIsFetching(false);
                }
            };

            fetchUserData();
        }
    }, [mode, id]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Only validate password fields if it's not an edit or if password is being changed
        if (mode === 'create' || formData.password || formData.confirmPassword) {
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters long';
            }

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast({
                title: "Success",
                description: mode === 'create' ? "User created successfully" : "User updated successfully",
            });
            navigate('/users');
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save user. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    {mode === 'create' ? 'Add New User' : 'Edit User'}
                </h1>
                <Button variant="outline" onClick={() => navigate('/users')}>
                    Back to Users
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card shadow rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                required
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        {mode === 'create' && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required={mode === 'create'}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required={mode === 'create'}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => navigate('/users')}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {mode === 'create' ? 'Create User' : 'Update User'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserAddForm; 