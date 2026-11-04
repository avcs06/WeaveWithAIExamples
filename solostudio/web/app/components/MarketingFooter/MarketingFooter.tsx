import { NextLink } from '@app/components/NextLink';
import { Paragraph } from '@packages/ui/Typography';
import React from 'react';

/**
 * The public site's footer bar: the site links, then a line of small print.
 */
export const MarketingFooter = () => {
  return (
    <>
      <nav aria-label="Site" className="flex-row-gap-4 flex-wrap">
        <NextLink look="plain" href="/book">
          Book a session
        </NextLink>
      </nav>
      <Paragraph color="muted">© 2026 SoloStudio</Paragraph>
    </>
  );
};
