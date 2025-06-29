import Layout from '@/layout/Layout';
import WelcomeLayout from '@/layout/WelcomeLayout';
import publicRoutes from './public.routes';
import privateRoutes from './private.routes';
import { Navigate } from 'react-router-dom';

const routes = [
    {
        path: '/',
        element: <WelcomeLayout />,
        children: [...publicRoutes],
    },
    {
        path: '/user',
        element: <Layout />,
        children: [...privateRoutes],
    },
    { path: '*', element: <Navigate to='/' /> },
];

export default routes;
