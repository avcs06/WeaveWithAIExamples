'use client';

import { UserMenu } from '@app/components/UserMenu';
import { Dropdown } from '@packages/ui/Dropdown';
import { SidebarMenuItem } from '@packages/ui/SidebarMenu';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

/**
 * The bottom of the app's sidebar: the account menu, with Account settings
 * above Sign out.
 */
export const AppSidebarFooter = () => {
  const router = useRouter();

  return (
    <SidebarMenuItem as="div">
      <UserMenu placement="sidebar" signInHref="/sign-in">
        <Dropdown.Item
          leftIcon={<Settings />}
          onSelect={() => router.push('/account')}
        >
          Account settings
        </Dropdown.Item>
      </UserMenu>
    </SidebarMenuItem>
  );
};
