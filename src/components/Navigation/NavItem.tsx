import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import { Route } from '@/routes/routes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface NavItemProps {
    item: Route;
    isExpanded: boolean;
    depth?: number;
    onToggle?: () => void;
    isOpen: boolean
}

export const NavItem: FC<NavItemProps> = ({
    item,
    isExpanded,
    depth = 0,
    onToggle,
    isOpen,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const Icon = item.icon;
    const isActive = location.pathname === item.path 
    const hasChildren = item.children && item.children.length > 0;

    

    const handleClick = () => {
        if (hasChildren) {
            onToggle?.();
        } else {
            navigate(item.path);
        }
    };

    return (
        <TooltipProvider>
            <div className="relative">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start ",
                                depth > 0 && "pl-8",
                                !isExpanded && "justify-center"
                            )}
                            onClick={handleClick}

                        >
                            <div className="flex items-center w-full">
                                {Icon && <Icon className="h-4 w-4 mr-4" />}
                                {isExpanded && (
                                    <>
                                        <span className="flex-1 text-start text-sm">{item.title}</span>
                                        {hasChildren && (
                                            <ChevronRight className={cn(
                                                "h-4 w-4 ml-auto transition-transform",
                                                isOpen && "transform rotate-90"
                                            )} />
                                        )}
                                    </>
                                )}
                            </div>
                        </Button>
                    </TooltipTrigger>
                    {!isExpanded && (
                        <TooltipContent side="right">
                            {item.title}
                        </TooltipContent>
                    )}
                </Tooltip>
            </div>
        </TooltipProvider>
    );
};



interface NavigationProps {
    items: Route[];
    isExpanded: boolean;
    setSidebarExpanded:(val:boolean)=>void
}

export const Navigation: FC<NavigationProps> = ({ items, isExpanded ,setSidebarExpanded}) => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const [openMenus, setOpenMenus] = useState(new Set());

    const toggleSubmenu = (id:string) => {
        setOpenMenus((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const toggleItem = (path: string) => {
        setExpandedItems(current =>
            current.includes(path)
                ? current.filter(p => p !== path)
                : [...current, path]
        );

        if (!isExpanded) {
            setSidebarExpanded(true)
        }

    };

    const renderItems = (items: Route[], depth = 0) => {
        return items.map((item) => (
            <div key={item.path}>
                <NavItem
                    item={item}
                    isExpanded={isExpanded}
                    depth={depth}
                    onToggle={() => {
                        toggleItem(item.path)
                        toggleSubmenu(item.id)
                    }}
                    isOpen={openMenus.has(item.id)}
                />
                {item.children &&
                    expandedItems.includes(item.path) &&
                    isExpanded && (
                        <div className="ml-4">
                            {renderItems(item.children, depth + 1)}
                        </div>
                    )}
            </div>
        ));
    };

    return (
        <nav className="space-y-1">
            {renderItems(items)}
        </nav>
    );
};



