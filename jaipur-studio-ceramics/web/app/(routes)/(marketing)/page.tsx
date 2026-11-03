'use client';

// Loads its records through listPieces.
import { PieceCardGrid } from '@app/blocks/PieceCard';
import { pieceTotalStock } from '@app/blocks/stock';
import { Hero } from '@app/components/Hero';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { useListPieces } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { CardList } from '@packages/ui/Card';
import { Paragraph } from '@packages/ui/Typography';
import { Package, ShoppingBag, Truck, Wallet } from 'lucide-react';
import React from 'react';

const reasons = [
  {
    id: 'small-batches',
    icon: <Package aria-hidden size={'25px'} />,
    title: 'Made in small batches',
    line: 'Each glaze and size shows the real stock left, so what you order is what we have.',
  },
  {
    id: 'no-messaging',
    icon: <ShoppingBag aria-hidden />,
    title: 'Order without messaging',
    line: 'Add pieces to your cart and place your order here in a few calm steps.',
  },
  {
    id: 'upi-later',
    icon: <Wallet aria-hidden />,
    title: 'Pay by UPI later',
    line: 'No online payment is taken. The studio will collect payment by UPI after you order.',
  },
  {
    id: 'pickup-courier',
    icon: <Truck aria-hidden />,
    title: 'Pickup or courier',
    line: 'Pick up at the Jaipur studio for free, or choose courier delivery for ₹99, free on discounted orders of more than ₹1,500.',
  },
];

export default function HomePage() {
  const { data: pieces, loading, error, retry } = useListPieces();
  const inStock = (pieces ?? []).filter((piece) => pieceTotalStock(piece) > 0);
  const featured = inStock.slice(0, 3);

  if (loading) {
    return <LoadingView message="Loading the shop…" />;
  }

  if (error) {
    return (
      <LoadFailedView
        message="Something went wrong while loading the shop."
        onRetry={retry}
      />
    );
  }

  return (
    <>
      <Hero
        title="Handmade ceramics from our Jaipur studio"
        description="Small-batch mugs, bowls, planters and vases, made in Jaipur and sold only while they are in stock. Order here, no messaging needed."
        actions={
          <Button as={NextLink} href="/pieces">
            Browse pieces
          </Button>
        }
      />
      {featured.length > 0 ? (
        <PieceCardGrid
          pieces={featured}
          hrefFor={(piece) => `/pieces/${piece.id}`}
          label="Featured pieces"
        />
      ) : (
        <div className="flex-col-gap-4 items-start">
          <Paragraph>
            Everything is sold out and a new batch is being made.
          </Paragraph>
          <Button as={NextLink} href="/pieces">
            Browse pieces
          </Button>
        </div>
      )}
      <CardList
        aria-label="Why order from the studio"
        items={reasons}
        layout="grid" // Four reasons sit side by side in two rows, so none sits alone.
        columns={2}
        renderItem={(reason) => (
          <>
            {reason.icon}
            <h3>{reason.title}</h3>
            <p>{reason.line}</p>
          </>
        )}
      />
    </>
  );
}
