'use client';

import { PieceCards } from '@app/blocks/pieces';
import { Hero } from '@app/components/Hero';
import { NextLink } from '@app/components/NextLink';
import { PageState } from '@app/components/PageState';
import { useListPieces } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { CardList } from '@packages/ui/Card';
import { Section } from '@packages/ui/Section';
import { Paragraph } from '@packages/ui/Typography';
import { Leaf, MessagesSquare, PackageCheck, Truck } from 'lucide-react';
import React from 'react';

const reasons = [
  {
    id: 'batches',
    title: 'Made in small batches',
    line: 'Each glaze and size shows the real stock left, so what you order is what we have.',
    icon: <Leaf />,
  },
  {
    id: 'messaging',
    title: 'Order without messaging',
    line: 'Choose your glaze and size, place your order, and we will collect payment by UPI later.',
    icon: <MessagesSquare />,
  },
  {
    id: 'pickup',
    title: 'Pickup or courier',
    line: 'Collect from our Jaipur studio for free, or choose courier for ₹99, free when your discounted subtotal is above ₹1,500.',
    icon: <Truck />,
  },
  {
    id: 'honest',
    title: 'Honest availability',
    line: 'Sold-out glazes are marked sold out and cannot be ordered until a new batch is ready.',
    icon: <PackageCheck />,
  },
];

/** The studio's own shop: the headline, why to buy here, and featured pieces. */
export default function HomePage() {
  const pieces = useListPieces();
  const all = pieces.data ?? [];
  const featured = all.slice(0, 3);

  return (
    <>
      <Hero
        title="Handmade ceramics from our Jaipur studio"
        description="Mugs, bowls, planters and vases made in small batches. Order what is actually in stock, with no account and no messaging."
        actions={
          <>
            <Button as={NextLink} href="/shop">
              Browse the shop
            </Button>
            <Button
              // The way to sign in sits beside the main action, as the hero asks.
              variant="base"
              as={NextLink}
              href="/sign-in"
            >
              Studio owner sign in
            </Button>
          </>
        }
        media={
          <div className="flex-col-gap-3">
            <PageState
              loading={pieces.loading}
              loadingText="Loading the latest pieces."
              errorText={
                pieces.error ? 'The pieces could not be loaded.' : undefined
              }
              onRetry={pieces.retry}
            />
            {!pieces.loading && !pieces.error && featured.length === 0 ? (
              <Paragraph>
                No pieces are available right now. New small batches are on
                the way, please check back later.
              </Paragraph>
            ) : null}
            {!pieces.loading && !pieces.error && featured.length > 0 ? (
              <PieceCards pieces={featured} />
            ) : null}
          </div>
        }
      />
      <Section title="Why buy from the studio">
        <CardList
          aria-label="Why buy from the studio"
          items={reasons}
          layout="grid"
          // Four reasons take two rows of two, so none sits alone.
          columns={2}
          renderItem={(reason) => (
            <>
              <span aria-hidden>{reason.icon}</span>
              <h3>{reason.title}</h3>
              <p>{reason.line}</p>
            </>
          )}
        />
      </Section>
    </>
  );
}
