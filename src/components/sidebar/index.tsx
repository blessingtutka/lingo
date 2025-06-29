import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupContent,
    SidebarGroup,
    SidebarMenuButton,
    SidebarGroupLabel,
    SidebarHeader,
} from '@/components/ui/sidebar';

import { NavContact } from './NavContact';
import { NavUser } from './NavUser';
import { NavBrand } from './NavBrand';
import { NavContactSkeleton } from '../skeleton';
import { getUser } from '@/services/user.service';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible='offcanvas' {...props}>
            <SidebarHeader>
                <NavBrand />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Contacts</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <React.Suspense fallback={<NavContactSkeleton />}>
                            <NavContact />
                        </React.Suspense>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuButton asChild>
                    <NavUser user={getUser()} />
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    );
}
