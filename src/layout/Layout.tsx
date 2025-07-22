import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout({ header }: { header: React.ReactElement }) {
    return (
        <SidebarProvider>
            <AppSidebar variant='inset' />
            <SidebarInset className='overflow-hidden'>
                <div className='flex flex-col min-h-screen overflow-hidden'>
                    {header}
                    <main className='content-bg flex-1 flex items-center justify-center p-4'>
                        <div className='w-full md:max-w-4/5 '>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
