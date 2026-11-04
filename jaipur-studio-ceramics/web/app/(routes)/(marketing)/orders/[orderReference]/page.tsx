'use client';

import {
  FulfilmentDetails,
  OrderItems,
  OrderTotals,
} from '@app/blocks/orders';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { FulfilmentStatusOptions } from '@app/entities/enums';
import { useGetOrder, useLookupOrder } from '@app/entities/order';
import { Button } from '@packages/ui/Button';
import { Tag } from '@packages/ui/Tag';
import { Paragraph } from '@packages/ui/Typography';
import { useParams } from 'next/navigation';
import React from 'react';

/** A placed order: its reference, items, totals and fulfilment. */
export default function OrderConfirmationPage() {
  const { orderReference } = useParams<{ orderReference: string }>();
  const lookup = useLookupOrder();
  const found = (lookup.data ?? []).find(
    (order) => order.orderReference === orderReference,
  );
  const detail = useGetOrder(found?.id ?? '');
  const order = detail.data ?? found;

  const orderLoading =
    lookup.loading || (found !== undefined && detail.loading);
  const orderFailed = Boolean(lookup.error || detail.error);
  if (orderLoading || orderFailed) {
    return (
      <PageState
        loading={orderLoading}
        loadingText="Loading your order."
        errorText={orderFailed ? 'The order could not be loaded.' : undefined}
        onRetry={() => {
          lookup.retry();
          detail.retry();
        }}
      />
    );
  }

  if (!order) {
    return (
      <>
        <NotFound
          title="Order not found"
          description="We could not find this order."
          back={{ label: 'Look up an order', href: '/order-lookup' }}
        />
        <div className="flex-row-gap-2">
          <Button as={NextLink} href="/shop">
            Browse the shop
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={`Order ${order.orderReference}`}
        description="Order placed. The owner will collect payment by UPI later; no online payment has been taken."
      />
      <Paragraph>
        Order {order.orderReference} is placed. Keep this reference with the
        phone number from checkout to look the order up again.
      </Paragraph>
      <OrderItems
        items={order.itemTitle.map((title, index) => ({
          key: `${title}|${order.itemGlaze[index]}|${order.itemSize[index]}`,
          title,
          glaze: order.itemGlaze[index],
          size: order.itemSize[index],
          quantity: order.quantity[index],
          price: order.itemPrice[index],
        }))}
      />
      <OrderTotals
        subtotal={order.subtotal}
        discountAmount={order.discountAmount ?? 0}
        shippingCost={order.shippingCost}
        total={order.total}
      />
      {order.discountCode ? (
        <Paragraph>
          Discount code: {order.discountCode}
        </Paragraph>
      ) : null}
      <div className="flex-row-gap-2 items-center">
        <Paragraph>{order.fulfilmentChoice === 'studio_pickup' ? 'Studio pickup' : 'Courier delivery'}</Paragraph>
        <Tag
          // The fulfilment state sits beside what it describes.
          variant={order.fulfilmentStatus === 'cancelled' ? 'error' : 'info'}
        >
          {FulfilmentStatusOptions.find(
            (option) => option.key === order.fulfilmentStatus,
          )?.label ?? order.fulfilmentStatus}
        </Tag>
      </div>
      <FulfilmentDetails
        choice={order.fulfilmentChoice}
        deliveryAddress={order.deliveryAddress}
        city={order.city}
        pinCode={order.pinCode}
      />
      <div className="flex-row-gap-2 flex-wrap items-center">
        <Button as={NextLink} href="/shop">
          Continue browsing
        </Button>
        <Button
          // Looking up the order is the quiet way out beside browsing.
          variant="base"
          as={NextLink}
          href="/order-lookup"
        >
          Look up an order
        </Button>
      </div>
    </>
  );
}
