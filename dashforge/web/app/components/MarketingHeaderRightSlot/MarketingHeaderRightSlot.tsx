'use client';

import { NextLink } from '@app/components/NextLink';
import { useCurrentUser } from '@app/entities/auth';
import { Button } from '@packages/ui/Button';
import React from 'react';

/**
 * The right end of the public site's header bar.
 *
 * Put here, in this order:
 * - Sign up, as the main action. Use `Button as={NextLink}` with
 *   `href="/sign-up"`. Leave it out when the landing page's hero already
 *   offers it.
 * - The account. Code places `UserMenu` here when the theme puts the
 *   account at the right. It shows Sign in to a visitor and the account
 *   menu to a member. Keep it last, as it is.
 *
 * PageLayout draws the bar and lays these items in a row. Return only the
 * items: no wrapper, height, padding, background or border.
 *
 * Never put here:
 * - A page's own actions. They go in the page's `PageHeader`.
 *
 * The line "The theme puts here" below names this app's items. Build those
 * and nothing else.
 *
 * The theme puts here: It holds: account.
 */
export const MarketingHeaderRightSlot = () => {
  const user = useCurrentUser();
  if (user === undefined) return null;
  if (user) {
    return (
      <Button as={NextLink} href="/dashboards">
        Go to dashboards
      </Button>
    );
  }
  return (
    <Button as={NextLink} href="/sign-in" data-user-menu="">
      Sign in
    </Button>
  );
};
