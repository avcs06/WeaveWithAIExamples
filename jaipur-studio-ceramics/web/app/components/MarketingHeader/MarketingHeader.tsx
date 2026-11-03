'use client';

import { NextLink } from '@app/components/NextLink';
import { usePathname } from 'next/navigation';
import React from 'react';

/**
 * The center of the public site's header, over its pages, kept in the bar's
 * middle whatever its ends hold. Style it as the theme names it. Sign in and
 * sign up have a layout of their own, without this header.
 *
 * Holds, as the theme names them:
 * - Links to the site's own pages or sections: a `NextLink` from
 *   `@app/components/NextLink` with `look="plain"` each.
 *
 * Leaves out:
 * - The logo and the account: the ends hold them, placed by code.
 * - A wrapper, height, padding, background or border: PageLayout draws the
 *   bar.
 * - Search, help or settings with no flow behind them.
 *
 * The theme puts here: It holds: navigation.
 */
export const MarketingHeader = () => {
  const pathname = usePathname();
  const onPieces = pathname === '/pieces' || pathname.startsWith('/pieces/');

  return (
    <NextLink href="/pieces" look="plain" aria-current={onPieces ? 'page' : undefined}>
      Pieces
    </NextLink>
  );
};
