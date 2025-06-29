import { Outlet } from 'react-router-dom';
import { WelcomeHeader } from '@/components/header';

export default function WelcomeLayout() {
    return (
        <div className='flex flex-col min-h-screen'>
            <WelcomeHeader />
            <main className='content-bg flex-1 flex items-center justify-center p-4'>
                <div className='w-full max-w-md'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
