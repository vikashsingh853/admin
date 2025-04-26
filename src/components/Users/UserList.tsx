import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UserList = ({ userType }: { userType: string }) => {
    const navigate = useNavigate();
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">{userType}</h1>
                <Button onClick={() => navigate('/users/form/create')}>Add User</Button>
            </div>
            <div className="bg-white shadow rounded-lg overflow-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Role</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">
                                    <Button
                                        variant="ghost"
                                        onClick={() => navigate(`/users/${user.id}`)}
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;