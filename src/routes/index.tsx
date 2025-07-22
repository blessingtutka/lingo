import Layout from '@/layout/Layout';
import WelcomeLayout from '@/layout/WelcomeLayout';
import publicRoutes from './public.routes';
import privateRoutes from './private.routes';
import contactRoutes from './contact.routes';
import { Navigate } from 'react-router-dom';
import { ContactHeader, HomeHeader } from '@/components/header';
const routes = [
    {
        path: '/',
        element: <WelcomeLayout />,
        children: [...publicRoutes],
    },
    {
        path: '/user',
        element: <Layout header={<HomeHeader />} />,
        children: [...privateRoutes],
    },
    {
        path: '/user/contact/:contactId',
        element: <Layout header={<ContactHeader />} />,
        children: [...contactRoutes],
    },
    { path: '*', element: <Navigate to='/' /> },
];

export default routes;
