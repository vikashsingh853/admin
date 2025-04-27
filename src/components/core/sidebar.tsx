import { cn } from '@/lib/utils';
import { routes } from '@/routes/routes';
import { Dispatch } from 'react';
import { Navigation } from '../Navigation/NavItem';

interface Props{
  isExpanded: boolean
  isMobile: boolean
  setSidebarExpanded: Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ isExpanded, isMobile, setSidebarExpanded }: Props) => {
  
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-full pt-16 transition-all duration-300 bg-background border-r",
        isExpanded ? "w-64" : "w-16",
        isMobile ? (isExpanded ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
        "lg:translate-x-0" // Always show on desktop
      )}
    >
      <div className="h-full px-2 py-4 overflow-y-auto">
        <nav className="space-y-0.5">
          <Navigation items={routes} isExpanded={isExpanded} setSidebarExpanded={setSidebarExpanded} />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar


