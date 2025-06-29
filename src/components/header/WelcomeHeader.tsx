import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Brand } from '../global';
import { UserPlus, LogIn, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WelcomeHeader() {
    return (
        <header className='flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
            <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
                <Brand />
                <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
                <h1 className='text-base font-medium flex items-center gap-1.5'>
                    <Smile className='h-5' /> <span>Welcome</span>
                </h1>
                <div className='ml-auto flex items-center gap-2'>
                    <Button asChild size='sm' className='main-btn'>
                        <Link to='/auth?tab=login' className='dark:text-foreground'>
                            <LogIn />
                            <span>Login</span>
                        </Link>
                    </Button>
                    <Button asChild size='sm' className='main-btn'>
                        <Link to='/auth?tab=signup' className='dark:text-foreground'>
                            <UserPlus />
                            <span>Signup</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
