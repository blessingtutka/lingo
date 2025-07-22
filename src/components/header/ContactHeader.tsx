import { EllipsisVertical, Trash2, Info, BrushCleaning } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserAvatar } from '../global';
import { useUser } from '@/providers/user.provider';
import { Link, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export function ContactHeader() {
    const { user } = useUser();
    const { contactId } = useParams<{ contactId: string }>();

    const placeholderContact = {
        id: 'placeholder-id',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        avatar: '',
    };

    const contact = user?.contacts?.find((c) => c.id === contactId) || placeholderContact;

    if (!contact) {
        return <Navigate to='/user' replace />;
    }
    return (
        <header className='flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
            <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
                <UserAvatar user={contact} />
                <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>{contact.name || contact.email}</span>
                    <span className='text-muted-foreground truncate text-xs'>{contact.email}</span>
                </div>
                <div className='ml-auto flex items-center gap-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <EllipsisVertical className='ml-auto size-4' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg' align='end' sideOffset={4}>
                            <DropdownMenuLabel className='flex w-full items-center gap-2 text-sm outline-none p-1 font-normal hover:text-blue-400'>
                                <Info className='hover:text-blue-400' />
                                <Link to={`/user/contact/${contactId}/info`}>More Info</Link>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link to={`/user/contact/${contactId}/clear`} className='flex w-full items-center gap-2 p-3 text-sm outline-none'>
                                        <BrushCleaning />
                                        Clear Chat
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        to={`/user/contact/${contactId}/delete`}
                                        className='flex !text-destructive w-full items-center gap-2 p-3 text-sm outline-none'
                                    >
                                        <Trash2 className='!text-destructive' />
                                        Delete Contact
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
