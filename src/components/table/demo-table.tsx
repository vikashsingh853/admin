import { DataTable } from "./data-table";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: string;
    category: string;
    status: 'active' | 'inactive';
    createdAt: string;
};

const initialServices: Service[] = [
    {
        id: 1,
        name: "Haircut & Styling",
        description: "Professional haircut and styling service",
        price: 35,
        duration: "45 mins",
        category: "Hair",
        status: "active",
        createdAt: "2024-03-01"
    },
    {
        id: 2,
        name: "Deep Tissue Massage",
        description: "Full body deep tissue massage",
        price: 85,
        duration: "60 mins",
        category: "Massage",
        status: "active",
        createdAt: "2024-03-02"
    },
    {
        id: 3,
        name: "Facial Treatment",
        description: "Luxury facial with premium products",
        price: 65,
        duration: "45 mins",
        category: "Skin Care",
        status: "active",
        createdAt: "2024-03-03"
    },
    {
        id: 4,
        name: "Manicure & Pedicure",
        description: "Complete nail care service",
        price: 55,
        duration: "75 mins",
        category: "Nails",
        status: "active",
        createdAt: "2024-03-04"
    },
    {
        id: 5,
        name: "Hot Stone Massage",
        description: "Relaxing hot stone therapy",
        price: 95,
        duration: "90 mins",
        category: "Massage",
        status: "inactive",
        createdAt: "2024-03-05"
    }
];

export default function ServicesTable() {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [deletingService, setDeletingService] = useState<Service | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (service: Service) => {
        setDeletingService(service);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deletingService) {
            setServices(services.filter(s => s.id !== deletingService.id));
            setIsDeleteDialogOpen(false);
            setDeletingService(null);
        }
    };

    const handleSave = () => {
        if (editingService) {
            setServices(services.map(service => 
                service.id === editingService.id ? editingService : service
            ));
            setIsEditDialogOpen(false);
            setEditingService(null);
        }
    };

    return (
        <div className="p-4">
            <DataTable
                data={services}
                actions={(row) => [
                    { label: "Edit", onClick: () => handleEdit(row) },
                    { label: "Delete", onClick: () => handleDelete(row) },
                ]}
                mandatoryKeys={['name', 'price', 'category']}
                shownKeys={['description', 'duration', 'status', 'createdAt']}
                filterKeys={['name', 'category', 'status']}
            />

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Service</DialogTitle>
                    </DialogHeader>
                    {editingService && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    id="name"
                                    value={editingService.name}
                                    onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Description</Label>
                                <Input
                                    id="description"
                                    value={editingService.description}
                                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={editingService.price}
                                    onChange={(e) => setEditingService({...editingService, price: Number(e.target.value)})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="duration" className="text-right">Duration</Label>
                                <Input
                                    id="duration"
                                    value={editingService.duration}
                                    onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Category</Label>
                                <Input
                                    id="category"
                                    value={editingService.category}
                                    onChange={(e) => setEditingService({...editingService, category: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Status</Label>
                                <select
                                    id="status"
                                    value={editingService.status}
                                    onChange={(e) => setEditingService({...editingService, status: e.target.value as 'active' | 'inactive'})}
                                    className="col-span-3 p-2 border rounded"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Service</DialogTitle>
                    </DialogHeader>
                    {deletingService && (
                        <div className="py-4">
                            <p>Are you sure you want to delete the service "{deletingService.name}"?</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                This action cannot be undone.
                            </p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
