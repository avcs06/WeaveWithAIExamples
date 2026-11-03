'use client';

import {
  FulfilmentDetails,
  OrderItems,
  OrderTotals,
} from '@app/blocks/orders';
import { sizeLabel } from '@app/blocks/pieces';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import {
  advanceOrderFulfilment,
  cancelOrderWithRestore,
  markOrderPaid,
  useGetOrder,
} from '@app/entities/order';
import { Button } from '@packages/ui/Button';
import {
  DialogResult,
  openConfirmationDialog,
} from '@packages/ui/Dialog';
import { Tag } from '@packages/ui/Tag';
import { toast } from '@packages/ui/Toast';
import { Paragraph } from '@packages/ui/Typography';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

/** One order: its buyer, items, totals and destination, then act on it. */
export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = useGetOrder(orderId);
  const [busy, setBusy] = useState<string | null>(null);

  if (order.loading || order.error) {
    return (
      <PageState
        loading={order.loading}
        loadingText="Loading the order."
        errorText={order.error ? 'The order could not be loaded.' : undefined}
        onRetry={order.retry}
      />
    );
  }

  const record = order.data;
  if (!record) {
    return (
      <NotFound
        title="Order not found"
        description="This order is gone."
        back={{ label: 'Back to orders', href: '/dashboard/orders' }}
      />
    );
  }

  const markPaid = async () => {
    if (busy) return;
    if (record.paymentStatus === 'paid') {
      toast({ title: 'The order is already paid.', status: 'info' });
      return;
    }
    setBusy('paid');
    try {
      await markOrderPaid(record.id, { paymentStatus: 'paid' });
      toast({ title: 'Marked as paid', status: 'success' });
    } catch {
      toast({
        title: 'The order could not be marked as paid',
        description: 'Try again.',
        status: 'error',
      });
    } finally {
      setBusy(null);
    }
  };

  const advance = async (to: 'packed' | 'shipped' | 'picked_up') => {
    if (busy) return;
    if (record.fulfilmentStatus !== 'new' && record.fulfilmentStatus !== 'packed') {
      toast({
        title: 'Only New or Packed orders can be moved.',
        status: 'info',
      });
      return;
    }
    setBusy(to);
    try {
      await advanceOrderFulfilment(record.id, { fulfilmentStatus: to });
      toast({
        title:
          to === 'packed'
            ? 'Marked as packed'
            : to === 'shipped'
              ? 'Marked as shipped'
              : 'Marked as picked up',
        status: 'success',
      });
    } catch {
      toast({
        title: 'The order could not be moved',
        description: 'Try again.',
        status: 'error',
      });
    } finally {
      setBusy(null);
    }
  };

  const cancel = async () => {
    if (busy) return;
    if (record.fulfilmentStatus !== 'new' && record.fulfilmentStatus !== 'packed') {
      toast({
        title: 'Only New or Packed orders can be cancelled.',
        status: 'info',
      });
      return;
    }
    const result = await openConfirmationDialog({
      title: 'Cancel this order?',
      content: `Cancelling ${record.orderReference} restores the stock of each ordered variant so the pieces become orderable again.`,
      // Cancelling cannot be undone, so the confirm reads as danger.
      status: 'error',
      footer: (closeDialog) => (
        <>
          <Button
            // Keeping the order is the quiet way out of the confirm.
            variant="base"
            onClick={() => closeDialog(DialogResult.cancel)}
          >
            Keep order
          </Button>
          <Button
            // Cancelling is the confirm's filled danger button.
            variant="danger"
            onClick={() => closeDialog(DialogResult.confirm)}
          >
            Cancel order
          </Button>
        </>
      ),
    });
    if (result !== DialogResult.confirm) return;
    setBusy('cancel');
    try {
      const { unrestored } = await cancelOrderWithRestore(record.id);
      if (unrestored.length === 0) {
        toast({ title: 'Order cancelled', status: 'success' });
      } else {
        toast({
          title: 'Order cancelled',
          description: `Stock for ${unrestored
            .map(
              (line) =>
                `${line.title} (${line.glaze}, ${sizeLabel(line.size)})`,
            )
            .join('; ')} could not be restored because the piece or variant is gone.`,
          status: 'warning',
        });
      }
    } catch (error) {
      toast({
        title: 'Cancelling the order failed',
        description:
          error instanceof Error
            ? `${error.message} The order is unchanged. Try again.`
            : 'The order is unchanged. Try again.',
        status: 'error',
      });
    } finally {
      setBusy(null);
    }
  };

  const canCancel =
    record.fulfilmentStatus === 'new' || record.fulfilmentStatus === 'packed';

  return (
    <>
      <PageHeader
        title={`Order ${record.orderReference}`}
        breadcrumb={[{ label: 'Orders', href: '/dashboard/orders' }]}
        actions={
          <>
            {record.paymentStatus === 'unpaid' ? (
              <Button
                onClick={markPaid}
                loadingWithReason={busy === 'paid' ? 'Marking as paid' : undefined}
              >
                Mark as paid
              </Button>
            ) : null}
            {record.fulfilmentStatus === 'new' ? (
              <Button
                // Moving the order on is secondary to recording payment.
                variant="base"
                loadingWithReason={busy === 'packed' ? 'Marking as packed' : undefined}
                onClick={() => advance('packed')}
              >
                Mark as packed
              </Button>
            ) : null}
            {record.fulfilmentStatus === 'packed' &&
            record.fulfilmentChoice === 'courier_delivery' ? (
              <Button
                // Moving the order on is secondary to recording payment.
                variant="base"
                loadingWithReason={busy === 'shipped' ? 'Marking as shipped' : undefined}
                onClick={() => advance('shipped')}
              >
                Mark as shipped
              </Button>
            ) : null}
            {record.fulfilmentStatus === 'packed' &&
            record.fulfilmentChoice === 'studio_pickup' ? (
              <Button
                // Moving the order on is secondary to recording payment.
                variant="base"
                loadingWithReason={busy === 'picked_up' ? 'Marking as picked up' : undefined}
                onClick={() => advance('picked_up')}
              >
                Mark as picked up
              </Button>
            ) : null}
            {canCancel ? (
              <Button
                // Cancelling ends the order, so it reads as danger.
                variant="danger"
                loadingWithReason={busy === 'cancel' ? 'Cancelling the order' : undefined}
                onClick={cancel}
              >
                Cancel order
              </Button>
            ) : null}
          </>
        }
      />
      <div className="flex-row-gap-2 items-center">
        <Paragraph>
          {record.name} · {record.phoneNumber}
        </Paragraph>
        {record.paymentStatus === 'paid' ? (
          <Tag
            // Paid money is good news, so it reads as success.
            variant="success"
          >
            Paid
          </Tag>
        ) : (
          <Tag
            // Unpaid money still needs collecting.
            variant="warning"
          >
            Unpaid
          </Tag>
        )}
        {record.fulfilmentStatus === 'new' ? (
          <Tag
            // New orders must stand out from the rest.
            variant="info"
          >
            New
          </Tag>
        ) : record.fulfilmentStatus === 'cancelled' ? (
          <Tag
            // A cancelled order is over, so it reads as an error.
            variant="error"
          >
            Cancelled
          </Tag>
        ) : (
          <Tag>
            {record.fulfilmentStatus === 'picked_up'
              ? 'Picked Up'
              : record.fulfilmentStatus === 'packed'
                ? 'Packed'
                : 'Shipped'}
          </Tag>
        )}
      </div>
      <OrderItems
        items={record.itemTitle.map((title, index) => ({
          key: `${title}|${record.itemGlaze[index]}|${record.itemSize[index]}`,
          title,
          glaze: record.itemGlaze[index],
          size: record.itemSize[index],
          quantity: record.quantity[index],
          price: record.itemPrice[index],
        }))}
      />
      {record.discountCode ? (
        <Paragraph>Discount code: {record.discountCode}</Paragraph>
      ) : null}
      <OrderTotals
        subtotal={record.subtotal}
        discountAmount={record.discountAmount ?? 0}
        shippingCost={record.shippingCost}
        total={record.total}
      />
      <FulfilmentDetails
        choice={record.fulfilmentChoice}
        deliveryAddress={record.deliveryAddress}
        city={record.city}
        pinCode={record.pinCode}
      />
    </>
  );
}
