import { PageLogo } from '@app/components/PageLogo';
import React from 'react';

/**
 * The left end of the public site's header, over its pages. PageLayout
 * renders the bar and keeps this slot at its left end. It lays these
 * items in a row with the theme's gap.
 *
 * Holds, as the theme names them:
 * - Code places `PageLogo` here when the theme puts the logo at the header's
 *   left. Keep it first, as it is.
 * - Links to the site's own pages or sections, when the theme names them
 *   here: a `NextLink` from `@app/components/NextLink` with `look="plain"`
 *   each.
 *
 * Leaves out:
 * - A wrapper, height, padding, background or border: PageLayout draws the
 *   bar.
 * - An H1, a page's title or its actions: they go in the page's `PageHeader`
 *   from `@app/components/PageHeader`.
 *
 * The theme puts here: It holds: logo.
 */
export const MarketingHeaderLeftSlot = () => {
  return (
    <PageLogo />
  );
};
