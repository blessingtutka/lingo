import Home from '@/pages/Home';
import { AuthTabs } from '@/pages/Auth';
import { ResetPassword } from '@/components/account/ResetPassword';
import { PasswordResetRequest } from '@/components/account/PasswordResetRequest';
import { EmailVerifed } from '@/components/account/EmailVerified';
const publicRoutes = [
    { path: '', element: <Home />, exact: true },
    { path: 'auth', element: <AuthTabs /> },
    { path: '/password-reset-request', element: <PasswordResetRequest /> },
    { path: '/password-reset', element: <ResetPassword /> },
    { path: '/verify-email', element: <EmailVerifed /> },
];

export default publicRoutes;
