// components/Breadcrumb.tsx
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    title: string;
    path: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-500">
            <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900"
            >
                <Home className="h-4 w-4" />
            </Link>

            {items.map((item, index) => (
                <div key={item.path} className="flex items-center">
                    <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                    {index === items.length - 1 ? (
                        <span className="font-medium text-gray-900">
                            {item.title}
                        </span>
                    ) : (
                        <Link
                            to={item.path}
                            className="hover:text-gray-900 transition-colors"
                        >
                            {item.title}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb