import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { UserAvatar } from '../global';
import { fetchContacts } from '@/services/contact.service';
import { Link } from 'react-router-dom';

export async function NavContact() {
    const contacts = await fetchContacts();

    return (
        <SidebarMenu>
            {contacts.map((contact) => (
                <SidebarMenuItem key={contact.id} className='my-1'>
                    <SidebarMenuButton asChild>
                        <Link to={contact.id}>
                            <UserAvatar user={contact} />
                            <span>{contact.displayName}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
