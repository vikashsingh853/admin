import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const UserAddForm = () => {
    const navigate = useNavigate();
    const { id, mode } = useParams<{ id?: string; mode: string }>();
    const isEdit = mode === 'edit';
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(isEdit);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (isEdit && id) {
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
    }, [isEdit, id]);

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
        if (!isEdit || formData.password || formData.confirmPassword) {
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
            // Here you would typically make an API call to create/update the user
            console.log('Form submitted:', formData);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('/users');
        } catch (error) {
            console.error('Error saving user:', error);
            setErrors(prev => ({
                ...prev,
                submit: `Failed to ${isEdit ? 'update' : 'create'} user. Please try again.`
            }));
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
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {isEdit ? 'Edit User' : 'Add New User'}
                </h1>
                <Button variant="outline" onClick={() => navigate('/users')}>
                    Back to Users
                </Button>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                required
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        {!isEdit && (
                            <>
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border ${
                                            errors.password ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        required={!isEdit}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border ${
                                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        required={!isEdit}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {errors.submit && (
                        <div className="text-sm text-red-500 text-center">{errors.submit}</div>
                    )}

                    <div className="flex justify-end">
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="min-w-[120px]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {isEdit ? 'Updating...' : 'Adding...'}
                                </>
                            ) : (
                                isEdit ? 'Update User' : 'Add User'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserAddForm; 