import { EllipsisVertical, LogOut, Bell, CircleUserRound } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '../global';
import { Link } from 'react-router-dom';
import { useUser } from '@/providers/user.provider';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Button } from '../ui/button';

export function NavUser({ user }: { user: User }) {
    const { isMobile } = useSidebar();
    const { removeToken } = useUser();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                            <UserAvatar user={user} />
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-medium'>{user.name || user.email}</span>
                                <span className='text-muted-foreground truncate text-xs'>{user.email}</span>
                            </div>
                            <EllipsisVertical className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                        side={isMobile ? 'bottom' : 'right'}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='p-0 font-normal'>
                            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                <UserAvatar user={user} />
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>{user.name}</span>
                                    <span className='text-muted-foreground truncate text-xs'>{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link to={'/user/account'} className='flex w-full items-center gap-2 px-2 py-1.5 text-sm outline-none'>
                                    <CircleUserRound />
                                    Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to={'/user/account'} className='flex w-full items-center gap-2 px-2 py-1.5 text-sm outline-none'>
                                    <Bell />
                                    Notifications
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (confirm('Are you sure you want to log out?')) {
                                        removeToken();
                                    }
                                }}
                                className='flex w-full items-center gap-2 px-2 py-1.5 text-sm outline-none'
                            >
                                <LogOut />
                                Log out
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
