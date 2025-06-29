import Home from '@/pages/Home';
import { Account } from '@/pages/Account';
import Call from '@/pages/Call';

const privateRoutes = [
    { path: '', element: <Home />, exact: true },
    { path: 'account', element: <Account /> },
    { path: 'call', element: <Call /> },
];

export default privateRoutes;
