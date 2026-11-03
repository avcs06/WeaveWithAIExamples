'use client';

import { CartLink } from '@app/components/CartLink';
import { NextLink } from '@app/components/NextLink';
import { UserMenu } from '@app/components/UserMenu';
import { useCurrentUser } from '@app/entities/auth';
import { Button } from '@packages/ui/Button';
import { Dropdown } from '@packages/ui/Dropdown';
import { LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

/**
 * The right end of the public site's header, over its pages. PageLayout
 * renders the bar and keeps this slot at its right end. It lays these
 * items in a row with the theme's gap.
 *
 * Holds, as the theme names them:
 * - Sign up as the main action, `Button as={NextLink}` to the sign-up page,
 *   unless the landing page's hero offers it.
 * - Code places `UserMenu` here when the theme puts the account at the
 *   header's right: Sign in for a visitor, the account menu for a member.
 *   Keep it last, as it is.
 *
 * Leaves out:
 * - A wrapper, height, padding, background or border: PageLayout draws the
 *   bar.
 * - A page's own actions: they go in the page's `PageHeader` from
 *   `@app/components/PageHeader`.
 *
 * The theme puts here: It holds: cart, account.
 */
export const MarketingHeaderRightSlot = () => {
  const user = useCurrentUser();
  const router = useRouter();

  return (
    <>
      <CartLink />
      {user === null ? (
        <Button as={NextLink} href="/sign-up">
          Create owner account
        </Button>
      ) : null}
      <UserMenu
        placement="header"
        signInHref="/sign-in"
        // The header already holds the main sign-up action above, so the
        // account's own Sign in stays secondary beside it.
        variant="base"
      >
        <Dropdown.Item
          leftIcon={<LayoutDashboard />}
          onSelect={() => router.push('/dashboard')}
        >
          Dashboard
        </Dropdown.Item>
      </UserMenu>
    </>
  );
};
