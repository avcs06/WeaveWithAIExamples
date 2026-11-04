'use client';

import { NextLink } from '@app/components/NextLink';
import { SidebarMenuItem } from '@packages/ui/SidebarMenu';
import { Calendar, Clock, Folder, Home, Tag, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

/**
 * The rows of the app's sidebar: one link per workspace page, in the order
 * the designer uses them.
 */
export const AppSidebar = () => {
  const pathname = usePathname();
  const selected = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <SidebarMenuItem
        as={NextLink}
        href="/home"
        selected={selected('/home')}
        leftIcon={<Home />}
      >
        Home
      </SidebarMenuItem>
      <SidebarMenuItem
        as={NextLink}
        href="/clients"
        selected={selected('/clients')}
        leftIcon={<Users />}
      >
        Clients
      </SidebarMenuItem>
      <SidebarMenuItem
        as={NextLink}
        href="/projects"
        selected={selected('/projects')}
        leftIcon={<Folder />}
      >
        Projects
      </SidebarMenuItem>
      <SidebarMenuItem
        as={NextLink}
        href="/sessions"
        selected={selected('/sessions')}
        leftIcon={<Calendar />}
      >
        Sessions
      </SidebarMenuItem>
      <SidebarMenuItem
        as={NextLink}
        href="/availability"
        selected={selected('/availability')}
        leftIcon={<Clock />}
      >
        Availability
      </SidebarMenuItem>
      <SidebarMenuItem
        as={NextLink}
        href="/session-types"
        selected={selected('/session-types')}
        leftIcon={<Tag />}
      >
        Session types
      </SidebarMenuItem>
    </>
  );
};
