'use client';

/**
 * The center of the public site's header bar. It stays in the middle of the
 * bar. Sign in and sign up have their own layout, without this header.
 *
 * Put here:
 * - Links to the site's own pages or sections. Use one `NextLink` from
 *   `@app/components/NextLink` with `look="plain"` per link. Example:
 *   Features, Pricing, About.
 *   Each link opens a route from `.weave/01-scaffold/routes.json`.
 *
 * PageLayout draws the bar. Return only the items: no wrapper, height,
 * padding, background or border.
 *
 * Never put here:
 * - The logo or the account. Code places them at the ends of the bar.
 * - A search, help or settings that no flow uses.
 *
 * The line "The theme puts here" below names this app's items. Build those
 * and nothing else.
 *
 * The theme puts here: It holds: navigation.
 */

import { NextLink } from '@app/components/NextLink';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/order-lookup', label: 'Look up an order' },
];

export const MarketingHeader = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Shop">
      <ul className="flex-row-gap-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <NextLink
              look="plain"
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </NextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
