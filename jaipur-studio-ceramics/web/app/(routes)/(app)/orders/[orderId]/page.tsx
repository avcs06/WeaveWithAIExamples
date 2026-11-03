'use client';

// Loads its records through getOrder, getPiece.
import { OrderDetails } from '@app/blocks/OrderDetails';
import { stockAfterOrderLines } from '@app/blocks/stock';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import {
  cancelOrder,
  markOrderPacked,
  markOrderPaid,
  markOrderPickedUp,
  markOrderShipped,
  useGetOrder,
} from '@app/entities/order';
import { getPiece, updatePiece } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import { Paragraph } from '@packages/ui/Typography';
import React, { useState } from 'react';

import type { Order } from '@app/entities/order';

type Saving = 'paid' | 'packed' | 'shipped' | 'pickedUp' | 'cancel' | null;

const cancellable = (order: Order): boolean =>
  order.fulfilmentStatus === 'new' || order.fulfilmentStatus === 'packed';

export default function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = React.use(params);
  const { data: order, loading, error, retry } = useGetOrder(orderId);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState<Saving>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  if (loading) {
    return (
      <LoadingView
        title="Order"
        breadcrumb={[{ label: 'Orders', href: '/orders' }]}
        message="Loading the order…"
      />
    );
  }

  if (error) {
    return (
      <LoadFailedView
        title="Order"
        breadcrumb={[{ label: 'Orders', href: '/orders' }]}
        message="Something went wrong while loading the order."
        onRetry={retry}
      />
    );
  }

  if (!order) {
    return (
      <NotFound
        title="This order cannot be found."
        description="It may have been removed, or the link is wrong."
        back={{ label: 'Orders', href: '/orders' }}
      />
    );
  }

  const markPaid = async () => {
    if (order.paymentStatus === 'paid') {
      setMessage('This order is already Paid.');
      return;
    }
    setMessage(null);
    setSaving('paid');
    try {
      await markOrderPaid(order.id, { paymentStatus: 'paid' });
      toast({
        title: 'Order marked paid',
        description: `Order ${order.orderReference} is now Paid.`,
        status: 'success',
      });
    } finally {
      setSaving(null);
    }
  };

  const markPacked = async () => {
    if (order.fulfilmentStatus !== 'new') {
      setMessage('Only a New order can be marked Packed.');
      return;
    }
    setMessage(null);
    setSaving('packed');
    try {
      await markOrderPacked(order.id, { fulfilmentStatus: 'packed' });
      toast({
        title: 'Order marked packed',
        description: `Order ${order.orderReference} is now Packed.`,
        status: 'success',
      });
    } finally {
      setSaving(null);
    }
  };

  const markShipped = async () => {
    if (
      order.fulfilmentStatus !== 'packed' ||
      order.fulfilmentChoice !== 'courier_delivery'
    ) {
      setMessage('Only a Packed courier order can be marked Shipped.');
      return;
    }
    setMessage(null);
    setSaving('shipped');
    try {
      await markOrderShipped(order.id, { fulfilmentStatus: 'shipped' });
      toast({
        title: 'Order marked shipped',
        description: `Order ${order.orderReference} is now Shipped.`,
        status: 'success',
      });
    } finally {
      setSaving(null);
    }
  };

  const markPickedUp = async () => {
    if (
      order.fulfilmentStatus !== 'packed' ||
      order.fulfilmentChoice !== 'studio_pickup'
    ) {
      setMessage('Only a Packed studio pickup order can be marked Picked Up.');
      return;
    }
    setMessage(null);
    setSaving('pickedUp');
    try {
      await markOrderPickedUp(order.id, { fulfilmentStatus: 'picked_up' });
      toast({
        title: 'Order marked picked up',
        description: `Order ${order.orderReference} is now Picked Up.`,
        status: 'success',
      });
    } finally {
      setSaving(null);
    }
  };

  // The single primary action: collecting UPI payment first, then the next
  // fulfilment step. Every other status action stays secondary.
  const primary: Saving | null =
    order.paymentStatus === 'unpaid'
      ? 'paid'
      : order.fulfilmentStatus === 'new'
        ? 'packed'
        : order.fulfilmentStatus === 'packed' &&
            order.fulfilmentChoice === 'courier_delivery'
          ? 'shipped'
          : order.fulfilmentStatus === 'packed'
            ? 'pickedUp'
            : null;

  const confirmCancel = async () => {
    setCancelError(null);
    setSaving('cancel');
    try {
      await cancelOrder(order.id, { fulfilmentStatus: 'cancelled' });
      for (let at = 0; at < order.pieces.length; at += 1) {
        const piece = await getPiece(order.pieces[at] ?? '');
        if (!piece) continue;
        await updatePiece(piece.id, {
          variantStockQuantity: stockAfterOrderLines(
            piece,
            [
              {
                glaze: order.orderedGlaze[at] ?? '',
                size: order.orderedSize[at] ?? '',
                quantity: order.quantity[at] ?? 0,
              },
            ],
            1,
          ),
        });
      }
      toast({
        title: 'Order cancelled',
        description: `Order ${order.orderReference} is now Cancelled and its stock is restored.`,
        status: 'success',
      });
      setCancelOpen(false);
    } catch {
      setCancelError(
        'Cancelling failed and the order and stock are unchanged.',
      );
    } finally {
      setSaving(null);
    }
  };

  return (
    <>
      <PageHeader
        title={`Order ${order.orderReference}`}
        breadcrumb={[{ label: 'Orders', href: '/orders' }]}
      />
      <div className="flex-col-gap-4 items-start">
        <OrderDetails order={order} showBuyer showStatus />
        {message ? <Paragraph role="status">{message}</Paragraph> : null}
        <div className="flex-row-gap-2 flex-wrap">
          <Button
            variant={primary === 'paid' ? undefined : 'base'} // Only the next step stands out; the rest stay secondary.
            loadingWithReason={
              saving === 'paid' ? 'Marking the order Paid' : undefined
            }
            onClick={markPaid}
          >
            Mark as paid
          </Button>
          <Button
            variant={primary === 'packed' ? undefined : 'base'} // Only the next step stands out; the rest stay secondary.
            loadingWithReason={
              saving === 'packed' ? 'Marking the order Packed' : undefined
            }
            onClick={markPacked}
          >
            Mark as packed
          </Button>
          <Button
            variant={primary === 'shipped' ? undefined : 'base'} // Only the next step stands out; the rest stay secondary.
            loadingWithReason={
              saving === 'shipped' ? 'Marking the order Shipped' : undefined
            }
            onClick={markShipped}
          >
            Mark as shipped
          </Button>
          <Button
            variant={primary === 'pickedUp' ? undefined : 'base'} // Only the next step stands out; the rest stay secondary.
            loadingWithReason={
              saving === 'pickedUp'
                ? 'Marking the order Picked Up'
                : undefined
            }
            onClick={markPickedUp}
          >
            Mark as picked up
          </Button>
          <Button
            variant="danger" // Cancelling destroys the order, so it reads as destructive.
            look="ghost" // Quiet on the page; the filled danger button waits in the confirm dialog.
            onClick={() => {
              setCancelError(null);
              setCancelOpen(true);
            }}
          >
            Cancel order
          </Button>
        </div>
        <NextLink look="plain" href="/orders">
          Orders
        </NextLink>
      </div>
      <Dialog
        title="Cancel this order?"
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        footer={
          cancellable(order) ? (
            <>
              <Button
                variant="base" // Quiet way out that changes nothing.
                onClick={() => setCancelOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger" // Confirming destroys the order, so it reads as destructive.
                loadingWithReason={
                  saving === 'cancel' ? 'Cancelling the order' : undefined
                }
                onClick={confirmCancel}
              >
                Cancel order
              </Button>
            </>
          ) : (
            <Button
              variant="base" // Quiet way out that changes nothing.
              onClick={() => setCancelOpen(false)}
            >
              Cancel
            </Button>
          )
        }
      >
        {cancellable(order) ? (
          <div className="flex-col-gap-2">
            <Paragraph>
              Cancelling restores the stock of its ordered variants.
            </Paragraph>
            {cancelError ? (
              <div className="flex-row-gap-2 flex-wrap items-center">
                <Paragraph role="alert">{cancelError}</Paragraph>
                <Button
                  variant="base" // Quiet retry beside the message it answers.
                  onClick={confirmCancel}
                >
                  Cancel order
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
          <Paragraph>Only a New or Packed order can be cancelled.</Paragraph>
        )}
      </Dialog>
    </>
  );
}
