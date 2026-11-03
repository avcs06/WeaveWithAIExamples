'use client';

// Loads its records through getOrder and getPiece.
import { OrderDetails } from '@app/blocks/OrderDetails';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { useGetOrder } from '@app/entities/order';
import { Button } from '@packages/ui/Button';
import React from 'react';

import { OrderLinePhoto } from './components/OrderLinePhoto';

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = React.use(params);
  const { data: order, loading, error, retry } = useGetOrder(orderId);

  if (loading) {
    return <LoadingView title="Order" message="Loading the order…" />;
  }

  if (error) {
    return (
      <LoadFailedView
        title="Order"
        message="Something went wrong while loading the order."
        onRetry={retry}
      />
    );
  }

  if (!order) {
    return (
      <>
        <NotFound
          title="We could not find that order."
          description="It may have been deleted, or the link is wrong."
          back={{ label: 'Find your order', href: '/order-lookup' }}
        />
        <div className="flex-row-gap-2 flex-wrap">
          <Button
            variant="base" // Second way out beside the way back.
            as={NextLink}
            href="/pieces"
          >
            Browse pieces
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={`Order ${order.orderReference}`}
        description="Order placed"
      />
      <div className="flex-col-gap-4 items-start">
        <div className="flex-row-gap-2 flex-wrap" aria-label="Ordered pieces">
          {order.pieces.map((pieceId, at) => (
            <OrderLinePhoto
              key={`${pieceId}-${at}`}
              pieceId={pieceId}
              name={order.orderedPieceName[at] ?? 'Ordered piece'}
            />
          ))}
        </div>
        <OrderDetails order={order} showBuyer={false} showStatus={false} />
        <div className="flex-row-gap-2 flex-wrap">
          <Button as={NextLink} href="/order-lookup">
            Find your order later
          </Button>
          <Button
            variant="base" // Secondary way out beside the main action.
            as={NextLink}
            href="/pieces"
          >
            Browse pieces
          </Button>
        </div>
      </div>
    </>
  );
}
