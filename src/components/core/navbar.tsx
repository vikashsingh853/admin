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


interface NavProps{
  toggleSidebar:()=>void
}

const Navbar = ({ toggleSidebar }: NavProps) => {
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
          <span className=' hidden md:block font-semibold text-purple-600 text-lg'>Sahayaata</span>

        </div>
       

        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Input
            type="search"
            placeholder="Search..."
            className="w-[180px] lg:w-[400px]"
          />
        </div>
        
        <div className='flex space-x-2 items-center'>
            <span className='hidden md:block'>Hi, Vikash</span>
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
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
</div>
       
      </div>
    </nav>
  );
};

export default Navbar