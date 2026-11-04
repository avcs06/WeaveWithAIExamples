'use client';

import { rupees } from '@app/blocks/orders';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { FulfilmentStatusOptions } from '@app/entities/enums';
import { useListOrders } from '@app/entities/order';
import { Button } from '@packages/ui/Button';
import { Chip, ChipGroup } from '@packages/ui/Chip';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { Truncate } from '@packages/ui/Truncate';
import { Time, Paragraph } from '@packages/ui/Typography';
import React, { useState } from 'react';

import type { FulfilmentStatus } from '@app/entities/enums';

type OrderRow = {
  id: string;
  orderReference: string;
  name: string;
  createdAt: string;
  total: number;
  paymentStatus: 'unpaid' | 'paid';
  fulfilmentStatus: FulfilmentStatus;
};

const OrdersTable = createTable<OrderRow>();

const fulfilmentTag = (status: FulfilmentStatus) => {
  switch (status) {
    case 'new':
      return (
        <Tag
          // New orders must stand out from the rest.
          variant="info"
        >
          New
        </Tag>
      );
    case 'packed':
      return (
        <Tag
          // Packed is on its way, so it reads as a warning to act.
          variant="warning"
        >
          Packed
        </Tag>
      );
    case 'cancelled':
      return (
        <Tag
          // A cancelled order is over, so it reads as an error.
          variant="error"
        >
          Cancelled
        </Tag>
      );
    default:
      return <Tag>{status === 'picked_up' ? 'Picked Up' : 'Shipped'}</Tag>;
  }
};

/** Orders: filter by fulfilment status, newest first. */
export default function OrdersPage() {
  const orders = useListOrders();
  const [status, setStatus] = useState('all');

  const all = [...(orders.data ?? [])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const matching =
    status === 'all'
      ? all
      : all.filter((order) => order.fulfilmentStatus === status);

  return (
    <>
      <PageHeader
        title="Orders"
        description="Every order, newest first, with payment and fulfilment state."
      />
      <PageState
        loading={orders.loading}
        loadingText="Loading the orders."
        errorText={orders.error ? 'The orders could not be loaded.' : undefined}
        onRetry={orders.retry}
      />
      {!orders.loading && !orders.error && all.length === 0 ? (
        <div className="flex-col-gap-3 items-start">
          <Paragraph role="status">
            No orders yet. New orders will appear here once buyers order from
            the shop.
          </Paragraph>
          <Button as={NextLink} href="/dashboard/pieces">
            View pieces
          </Button>
        </div>
      ) : !orders.loading && !orders.error ? (
        <>
          <ChipGroup
            label="Order status"
            value={status}
            onChange={(next) => next && setStatus(next)}
            className="flex-row-gap-2 flex-wrap"
          >
            <Chip value="all">All</Chip>
            {FulfilmentStatusOptions.map((option) => (
              <Chip key={option.key} value={option.key}>
                {option.label}
              </Chip>
            ))}
          </ChipGroup>
          {matching.length === 0 ? (
            <Paragraph role="status">
              No orders have this status.
            </Paragraph>
          ) : (
            <OrdersTable
              caption="Orders"
              data={matching.map((order) => ({
                id: order.id,
                orderReference: order.orderReference,
                name: order.name,
                createdAt: order.createdAt,
                total: order.total,
                paymentStatus: order.paymentStatus,
                fulfilmentStatus: order.fulfilmentStatus,
              }))}
              rowKey={(order) => order.id}
              onRowClick={(_, click) =>
                click.currentTarget.querySelector('a')?.click()
              }
            >
              <OrdersTable.Column
                id="orderReference"
                rowHeader
                title="Order"
                dataKey="orderReference"
                width={140}
              >
                {(reference, order) => (
                  <NextLink
                    href={`/dashboard/orders/${order.id}`}
                    className="inline-block max-w-full"
                  >
                    <Truncate>{reference}</Truncate>
                  </NextLink>
                )}
              </OrdersTable.Column>
              <OrdersTable.Column
                id="name"
                title="Buyer"
                dataKey="name"
                width={200}
              >
                {(name) => <Truncate>{name}</Truncate>}
              </OrdersTable.Column>
              <OrdersTable.Column
                id="createdAt"
                title="Date"
                dataKey="createdAt"
                width={140}
              >
                {(date) => <Time value={date} />}
              </OrdersTable.Column>
              <OrdersTable.Column
                id="total"
                title="Total"
                dataKey="total"
                width={130}
                align="right"
              >
                {(total) => <Numeral>{rupees.format(total)}</Numeral>}
              </OrdersTable.Column>
              <OrdersTable.Column
                id="paymentStatus"
                title="Payment"
                dataKey="paymentStatus"
                width={120}
              >
                {(payment: OrderRow['paymentStatus']) =>
                  payment === 'paid' ? (
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
                  )
                }
              </OrdersTable.Column>
              <OrdersTable.Column
                id="fulfilmentStatus"
                title="Fulfilment"
                dataKey="fulfilmentStatus"
                width={140}
              >
                {(fulfilment: FulfilmentStatus) => fulfilmentTag(fulfilment)}
              </OrdersTable.Column>
            </OrdersTable>
          )}
      </>
      ) : null}
    </>
  );
}
