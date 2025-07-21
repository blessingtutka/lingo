import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { UserAvatar } from '../global';
import { Link } from 'react-router-dom';
import { useUser } from '@/providers/user.provider';

export function NavContact() {
    const { user } = useUser();
    const contacts = user?.contacts || [];

    return (
        <SidebarMenu>
            {contacts.map((contact: User) => (
                <SidebarMenuItem key={contact.id} className='my-1'>
                    <SidebarMenuButton asChild>
                        <Link to={contact.id}>
                            <UserAvatar user={contact} />
                            <span className='ml-2'>{contact.name || contact.email}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
