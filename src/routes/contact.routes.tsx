import { ProtectedRoute } from './protected.routes';

import Call from '@/pages/Call';
import { ContactInfo, Contact } from '@/components/Contact';

const contactRoutes = [
    {
        path: '',
        element: (
            <ProtectedRoute>
                <Contact />
            </ProtectedRoute>
        ),
    },
    {
        path: 'info',
        element: (
            <ProtectedRoute>
                <ContactInfo />
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

export default contactRoutes;
