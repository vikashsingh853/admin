// hooks/useNavigation.ts
import { Route, routes } from '@/routes/routes';
import { useLocation } from 'react-router-dom';

const formatBreadcrumbTitle = (path: string): string => {
    // Remove leading slash and split by slash
    const segments = path.split('/').filter(Boolean);

    // Get the last segment
    const lastSegment = segments[segments.length - 1];

    // Special case mappings
    const titleMappings: Record<string, string> = {
        'dashboard': 'Dashboard',
        'users': 'Users',
        'settings': 'Settings',
        'general': 'General Settings',
        'security': 'Security Settings',
        'help': 'Help & Support',
        'add': 'Add New',
        'edit': 'Edit',
        'analytics': 'Analytics',
        'messages': 'Messages',
        'inbox': 'Inbox',
        'sent': 'Sent Messages',
        'notifications': 'Notifications'
    };

    // Check if we have a custom mapping
    if (lastSegment in titleMappings) {
        return titleMappings[lastSegment];
    }

    // If it's an ID parameter (assuming numeric or UUID format)
    if (/^\d+$/.test(lastSegment) || /^[0-9a-f-]{36}$/.test(lastSegment)) {
        return 'Details';
    }

    // Fallback: Capitalize first letter and add spaces before capital letters
    return lastSegment
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .trim();
};

export const useNavigation = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const findActiveRoute = (routes: Route[], pathname: string): Route[] => {
        for (const route of routes) {
            if (route.path === pathname) {
                return [route];
            }
            if (route.children) {
                const childRoute = findActiveRoute(route.children, pathname);
                if (childRoute.length) {
                    return [route, ...childRoute];
                }
            }
        }
        return [];
    };

    // Build the breadcrumb path segments
    const buildBreadcrumbs = () => {
        const pathSegments = pathname.split('/').filter(Boolean);
        let currentPath = '';

        return pathSegments.map((segment) => {
            currentPath += `/${segment}`;
            return {
                title: formatBreadcrumbTitle(currentPath),
                path: currentPath
            };
        });
    };

    return {
        activeRoutes: findActiveRoute(routes, pathname),
        breadcrumbs: buildBreadcrumbs(),
        currentPath: pathname,
        routes
    };
};