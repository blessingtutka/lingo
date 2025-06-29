import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    //   const { isAuthenticated } = useAuth(); // Your auth context
    const isAuthenticated = true;
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to='/auth' state={{ from: location }} replace />;
    }

    return children;
}
