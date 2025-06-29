import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar';
import { Outlet } from 'react-router-dom';
import { HomeHeader } from '@/components/header';
export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar variant='inset' />
            <SidebarInset className='overflow-hidden'>
                <div className='flex flex-col min-h-screen overflow-hidden'>
                    <HomeHeader />
                    <main className='content-bg flex-1 flex items-center justify-center p-4'>
                        <div className='w-full max-w-md'>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
