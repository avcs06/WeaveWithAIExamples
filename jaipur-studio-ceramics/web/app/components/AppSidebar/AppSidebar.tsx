'use client';

import { NextLink } from '@app/components/NextLink';
import { SidebarMenuItem } from '@packages/ui/SidebarMenu';
import { BadgePercent, LayoutDashboard, Package, Palette } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

/**
 * The app sidebar's rows. PageLayout renders the sidebar as a `SidebarMenu`:
 * its width, background and separation, the menu's spacing, and a list of
 * rows that scrolls between `AppSidebarHeader` and `AppSidebarFooter`.
 *
 * Holds, as the theme names them:
 * - One `SidebarMenuItem` from `@packages/ui/SidebarMenu` per destination,
 *   in the order the user needs them: `as={NextLink}` with its `href`, the
 *   `NextLink` from `@app/components/NextLink`. Mark the current page's row
 *   `selected`, from `usePathname()` of `next/navigation`. An icon goes in
 *   `leftIcon`, a count in `rightAddOn`.
 * - A list the user works through, such as their projects, one row each.
 *
 * Leaves out:
 * - An `aside`, `nav`, `SidebarMenu`, list or wrapper of its own, and any
 *   width, padding, background or border: PageLayout draws them.
 * - Buttons, fields or text among the rows: rows are links. Actions go in
 *   `AppSidebarHeader` or `AppSidebarFooter`.
 * - Destinations the header already holds, and pages no flow leads to.
 *
 * The theme puts here: Rows: navigation.
 */
export const AppSidebar = () => {
  const pathname = usePathname();
  const on = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <SidebarMenuItem
        as={NextLink}
        href="/dashboard"
        leftIcon={<LayoutDashboard />}
        selected={on('/dashboard')}
      >
        Dashboard
      </SidebarMenuItem>
      <SidebarMenuItem
        as={NextLink}
        href="/orders"
        leftIcon={<Package />}
        selected={on('/orders')}
      >
        Orders
      </SidebarMenuItem>
      <SidebarMenuItem
        as={NextLink}
        href="/studio/pieces"
        leftIcon={<Palette />}
        selected={on('/studio/pieces')}
      >
        Pieces
      </SidebarMenuItem>
      <SidebarMenuItem
        as={NextLink}
        href="/discount-codes"
        leftIcon={<BadgePercent />}
        selected={on('/discount-codes')}
      >
        Discount codes
      </SidebarMenuItem>
    </>
  );
};
