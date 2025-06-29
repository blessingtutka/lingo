import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Brand } from '../global';

export function NavBrand() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild className='data-[slot=sidebar-menu-button]:!p-1.5'>
                    <Brand />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
