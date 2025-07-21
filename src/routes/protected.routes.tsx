import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/providers/user.provider';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const isAuthenticated = !!user;
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to='/auth' state={{ from: location }} replace />;
    }

    return children;
}
