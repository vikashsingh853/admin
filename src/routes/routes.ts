// routes/routes.ts
import {
    Users,
    Settings,
    BarChart2,
    HelpCircle,
    ListOrdered,
    Wrench,
    HandshakeIcon,
    User,
    ClipboardCheck,
    Receipt,
    Cog,
    Phone} from 'lucide-react';
import { ElementType } from 'react';

export interface Route {
    path: string;
    title: string;
    icon?:   ElementType;
    children?: Route[];
    id:string
}

export const routes: Route[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        icon: BarChart2,
        id:'1'
    },
    {
        path: '/services',
        title: 'Services',
        icon: Wrench,
        id: '2'
    },
    {
        path: '/users',
        title: 'Users',
        icon: Users,
        id: '3',
        children: [
            {
                path: '/users/sahayata',
                title: 'Sahayata',
                id: '3.1',
                icon: HandshakeIcon
            },
            {
                path: '/users/consumers',
                title: 'Consumers',
                id: '3.2',
                icon: User
            }
        ]
    },
    {
        path: '/orders',
        title: 'Orders',
        icon: ListOrdered,
        id: '4',
        children: [
            {
                path: '/orders/bookings',
                title: 'Bookings',
                id: '4.1',
                icon: ClipboardCheck
            },
            {
                path: '/orders/refunds',
                title: 'Refunds',
                id: '4.2',
                icon: Receipt
            }
        ]
    },
   
    {
        path: '/settings',
        title: 'Settings',
        icon: Settings,
        id: '5',
        children: [
            {
                path: '/settings/general',
                title: 'General',
                id: '5.1',
                icon: Cog
            },
           
            {
                path: '/settings/help/dwjhgf',
                title: 'Help',
                icon: HelpCircle,
                id: '5.3',
                children: [
                    {
                        path: '/settings/help/contact-us',
                        title: 'Contact Us',
                        icon: Phone,
                        id: '5.3.1',

                    }
                ]
   
            }
        ]
    }
];