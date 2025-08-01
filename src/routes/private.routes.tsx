import { ProtectedRoute } from './protected.routes';
import Home from '@/pages/Home';
import Account from '@/pages/Account';
import { ChangePassword } from '@/components/account/ChangePassword';

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
        path: 'change-password',
        element: (
            <ProtectedRoute>
                <ChangePassword />
            </ProtectedRoute>
        ),
    },
];

export default privateRoutes;
