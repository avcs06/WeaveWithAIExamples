import { NextLink } from '@app/components/NextLink';
import { Caption, Paragraph } from '@packages/ui/Typography';
import React from 'react';

/**
 * The public site's footer items, under its pages. Sign in and sign up have
 * a layout of their own, without this footer. PageLayout renders the bar:
 * its height, padding, background and separation. It lays these items in a
 * row with the theme's gap.
 *
 * Holds, as the theme names them:
 * - Links to the site's own pages, such as About or Contact: a `NextLink`
 *   from `@app/components/NextLink` with `look="plain"` each.
 * - Links to other sites or an email: `Link` from `@packages/ui/Link` with
 *   `look="plain"`.
 * - A line of small print, such as the copyright: a `Paragraph` from
 *   `@packages/ui/Typography` with `color="muted"`.
 * - `<div className="flex-1" />` before the items that sit at the end.
 * - Code places `PageLogo` here when the theme puts the logo in the footer.
 *   Keep it as it is.
 *
 * Leaves out:
 * - A `footer` element, height, padding, background or border: PageLayout
 *   draws the bar.
 * - The header's links again, and pages, policies or social links the scope
 *   and the flows don't have.
 *
 * The theme puts here: Start: Studio pickup information. End: Order lookup.
 */
export const MarketingFooter = () => (
  <>
    <div className="flex-col-gap-1">
      <Paragraph>Free studio pickup from our Jaipur studio: 21 Gangwal Park, Jaipur 302001.</Paragraph>
      <Caption>Pick up Tuesday to Sunday, 10am to 6pm. We confirm your pickup slot after you order.</Caption>
    </div>
    <NextLink href="/order-lookup" look="plain">
      Find your order
    </NextLink>
  </>
);
