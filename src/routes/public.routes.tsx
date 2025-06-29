import Home from '@/pages/Home';
import { AuthTabs } from '@/pages/Auth';
const publicRoutes = [
    { path: '', element: <Home />, exact: true },
    { path: 'auth', element: <AuthTabs /> },
];

export default publicRoutes;
