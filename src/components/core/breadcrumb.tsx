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
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link
                to="/"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
                <Home className="h-4 w-4" />
            </Link>

            {items.map((item, index) => (
                <div key={item.path} className="flex items-center">
                    <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                    {index === items.length - 1 ? (
                        <span className="font-medium text-foreground">
                            {item.title}
                        </span>
                    ) : (
                        <Link
                            to={item.path}
                            className="hover:text-foreground transition-colors"
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