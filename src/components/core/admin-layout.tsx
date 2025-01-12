import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { useNavigation } from "@/lib/hooks/useNavigation";
import Navbar from "./navbar";
import Breadcrumb from "./breadcrumb";
import Sidebar from "./sidebar";

const AdminLayout = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { breadcrumbs } = useNavigation();

    useEffect(() => {
        const checkMobile = () => {
            const isMobileView = window.innerWidth < 1024;
            setIsMobile(isMobileView);
            if (isMobileView) {
                setSidebarExpanded(false);
            } else {
                setSidebarExpanded(true); 
            }
        };

      let timeoutId: ReturnType<typeof setTimeout>;
      
        const debouncedCheckMobile = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkMobile, 100);
        };

        checkMobile();
        window.addEventListener('resize', debouncedCheckMobile);

        return () => {
            window.removeEventListener('resize', debouncedCheckMobile);
            clearTimeout(timeoutId);
        };
    }, []);
  
 

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isExpanded={sidebarExpanded} isMobile={isMobile} setSidebarExpanded={setSidebarExpanded} />
      
      <main className={cn(
        "pt-16 transition-all duration-300 ",
        sidebarExpanded ? "ml-0 lg:ml-64" : "ml-0 lg:ml-16"
      )}>
        <div className="p-4">
          <Breadcrumb items={breadcrumbs} />
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};



export default AdminLayout;