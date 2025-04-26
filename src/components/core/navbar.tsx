import { Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

interface NavProps{
  toggleSidebar:()=>void
}

interface ProfileData {
  fullName: string;
  email: string;
  role: string;
}

const Navbar = ({ toggleSidebar }: NavProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Admin User",
    email: "admin@example.com",
    role: "Administrator"
  });

  // Effect to handle pointer-events cleanup
  useEffect(() => {
    const handlePointerEvents = () => {
      if (!showProfileModal && !showLogoutModal) {
        document.body.style.pointerEvents = '';
      }
    };

    handlePointerEvents();
    return () => {
      document.body.style.pointerEvents = '';
    };
  }, [showProfileModal, showLogoutModal]);

  // Reset all modal states when any modal is closed
  const handleModalClose = () => {
    setShowProfileModal(false);
    setShowLogoutModal(false);
    setIsEditing(false);
  };

  // Handle navigation with cleanup
  const handleNavigation = (path: string) => {
    handleModalClose();
    navigate(path);
  };

  const handleLogout = () => {
    handleModalClose();
    signOut();
  };

  const handleProfileEdit = () => {
    setIsEditing(true);
  };

  const handleProfileSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <nav className="border-b bg-white fixed z-30 w-full">
      <div className="flex h-16 items-center justify-between px-4">
        <div className='flex items-center gap-2'>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className=' hidden md:block font-semibold text-purple-600 text-lg'>Admin Demo</span>
        </div>
       
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Input
            type="search"
            placeholder="Search..."
            className="w-[180px] lg:w-[400px]"
          />
        </div>
        
        <div className='flex space-x-2 items-center'>
          <span className='hidden md:block'>Hi, { user?.displayName}</span>
          <div className=" flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                  <div className="p-2 rounded-full bg-gray-200 flex items-center justify-center">
                    <User />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-gray-500">{ user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowProfileModal(true)}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowLogoutModal(true)}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={(open) => {
        if (!open) handleModalClose();
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile Information</DialogTitle>
            <DialogDescription>
              {isEditing ? "Edit your profile details" : "View and manage your profile details"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-4 rounded-full bg-gray-200">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-medium">{profileData.fullName}</h3>
                <p className="text-sm text-gray-500">{profileData.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      value={profileData.role}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-sm font-medium">Full Name</Label>
                    <p className="text-sm">{profileData.fullName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm">{profileData.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Role</Label>
                    <p className="text-sm">{profileData.role}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleProfileSave}>Save Changes</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleModalClose}>Close</Button>
                <Button onClick={handleProfileEdit}>Edit Profile</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Modal */}
      <Dialog open={showLogoutModal} onOpenChange={(open) => {
        if (!open) handleModalClose();
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleModalClose}>Cancel</Button>
            <Button variant="destructive" onClick={handleLogout}>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar