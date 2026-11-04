'use client';

import { NextLink } from '@app/components/NextLink';
import { UserMenu } from '@app/components/UserMenu';
import { useCurrentUser } from '@app/entities/auth';
import { Button } from '@packages/ui/Button';
import React from 'react';

/**
 * The right end of the public site's header bar: the workspace action for a
 * signed-in designer, then the account.
 */
export const MarketingHeaderRightSlot = () => {
  const user = useCurrentUser();

  return (
    <>
      {user ? (
        <Button as={NextLink} href="/home">
          Open workspace
        </Button>
      ) : null}
      <UserMenu placement="header" signInHref="/sign-in" />
    </>
  );
};
