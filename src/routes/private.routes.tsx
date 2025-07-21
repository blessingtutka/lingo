import { ProtectedRoute } from './protected.routes';
import Home from '@/pages/Home';
import { Account } from '@/pages/Account';
import Call from '@/pages/Call';

const privateRoutes = [
    {
        path: '',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
        exact: true,
    },
    {
        path: 'account',
        element: (
            <ProtectedRoute>
                <Account />
            </ProtectedRoute>
        ),
    },
    {
        path: 'call',
        element: (
            <ProtectedRoute>
                <Call />
            </ProtectedRoute>
        ),
    },
];

export default privateRoutes;
