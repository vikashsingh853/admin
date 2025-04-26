import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

const UserDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Mock user data - in a real app, this would come from an API
    const user = {
        id: Number(id),
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        createdAt: '2024-01-01',
        lastLogin: '2024-03-15',
        status: 'Active'
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">User Details</h1>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => navigate('/users')}>
                        Back to Users
                    </Button>
                    <Button onClick={() => navigate(`/users/form/edit/${id}`)}>
                        Edit User
                    </Button>
                </div>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-medium mb-4">Basic Information</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="font-medium">{user.role}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-lg font-medium mb-4">Additional Information</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="font-medium">{user.status}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Created At</p>
                                <p className="font-medium">{user.createdAt}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Last Login</p>
                                <p className="font-medium">{user.lastLogin}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails; 