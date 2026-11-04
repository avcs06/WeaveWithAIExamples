'use client';

import { NextLink } from '@app/components/NextLink';
import { usePathname } from 'next/navigation';
import React from 'react';

/**
 * The center of the public site's header bar: the site navigation.
 */
export const MarketingHeader = () => {
  const pathname = usePathname();
  const onBook = pathname === '/book' || pathname.startsWith('/book/');

  return (
    <nav aria-label="Site">
      <NextLink look="plain" href="/book" aria-current={onBook ? 'page' : undefined}>
        Book a session
      </NextLink>
    </nav>
  );
};
