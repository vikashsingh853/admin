import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center space-y-6">
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <p className="text-xl text-gray-600">Page not found</p>
                <Button onClick={() => navigate('/dashboard')}>
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );
}

export default NotFound