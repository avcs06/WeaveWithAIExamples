'use client';

// Loads its records through listOrders.
import { formatINR } from '@app/blocks/money';
import {
  fulfilmentLabel,
  fulfilmentTone,
  paymentLabel,
  paymentTone,
} from '@app/blocks/orderStatus';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { useListOrders } from '@app/entities/order';
import { Button } from '@packages/ui/Button';
import { Numeral } from '@packages/ui/Numeral';
import { Select, SelectOption } from '@packages/ui/Select';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { Paragraph, Time } from '@packages/ui/Typography';
import React, { useState } from 'react';

type OrderRow = {
  key: string;
  id: string;
  reference: string;
  createdAt: string;
  buyerName: string;
  total: number;
  paymentStatus: string;
  fulfilmentStatus: string;
};

const OrderTable = createTable<OrderRow>();

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'packed', label: 'Packed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'picked_up', label: 'Picked Up' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'paid', label: 'Paid' },
] as const;

export default function OrdersPage() {
  const { data: orders, loading, error, retry } = useListOrders();
  const [filter, setFilter] = useState<string>('all');

  if (loading) {
    return <LoadingView title="Orders" message="Loading the orders…" />;
  }

  if (error) {
    return (
      <LoadFailedView
        title="Orders"
        message="Something went wrong while loading the orders."
        onRetry={retry}
      />
    );
  }

  const all = [...(orders ?? [])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  if (all.length === 0) {
    return (
      <>
        <PageHeader title="Orders" />
        <Paragraph>No orders yet. New guest orders will appear here.</Paragraph>
      </>
    );
  }

  const filtered =
    filter === 'all'
      ? all
      : all.filter(
          (order) =>
            order.fulfilmentStatus === filter ||
            order.paymentStatus === filter,
        );

  return (
    <>
      <PageHeader title="Orders" />
      <div className="flex-col-gap-4 items-start">
        <Select
          label="Order status"
          allowSearch={false}
          allowClear={false}
          value={filter}
          onChange={(next) => next && setFilter(next)}
        >
          {FILTERS.map((option) => (
            <SelectOption
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Select>
        {filtered.length === 0 ? (
          <div className="flex-col-gap-4 items-start">
            <Paragraph>No orders match the filter.</Paragraph>
            <Button
              variant="base" // Quiet way back to the full list.
              onClick={() => setFilter('all')}
            >
              Clear filter
            </Button>
          </div>
        ) : (
          <OrderTable
            caption="Orders"
            data={filtered.map((order) => ({
              key: order.id,
              id: order.id,
              reference: order.orderReference,
              createdAt: order.createdAt,
              buyerName: order.buyerName,
              total: order.total,
              paymentStatus: order.paymentStatus,
              fulfilmentStatus: order.fulfilmentStatus,
            }))}
            rowKey={(row) => row.key}
            onRowClick={(_, click) =>
              click.currentTarget.querySelector('a')?.click()
            }
          >
            <OrderTable.Column
              id="reference"
              rowHeader
              title="Order"
              dataKey="reference"
              width={120}
            >
              {(reference, row) => (
                <NextLink href={`/orders/${row.id}`}>{reference}</NextLink>
              )}
            </OrderTable.Column>
            <OrderTable.Column
              id="createdAt"
              title="Date"
              dataKey="createdAt"
              width={130}
            >
              {(value) => <Time value={value} />}
            </OrderTable.Column>
            <OrderTable.Column
              id="buyerName"
              title="Buyer"
              dataKey="buyerName"
              width={180}
            />
            <OrderTable.Column
              id="total"
              title="Total"
              dataKey="total"
              width={120}
              align="right"
            >
              {(total) => <Numeral>{formatINR(total)}</Numeral>}
            </OrderTable.Column>
            <OrderTable.Column
              id="paymentStatus"
              title="Payment"
              dataKey="paymentStatus"
              width={110}
            >
              {(status) => (
                <Tag
                  size="xs" // Fits the dense table row.
                  variant={paymentTone(status)} // Paid reads as done, unpaid as waiting.
                >
                  {paymentLabel(status)}
                </Tag>
              )}
            </OrderTable.Column>
            <OrderTable.Column
              id="fulfilmentStatus"
              title="Fulfilment"
              dataKey="fulfilmentStatus"
              width={160}
            >
              {(status) => (
                <span className="flex-row-gap-1 flex-wrap items-center">
                  <Tag
                    size="xs" // Fits the dense table row.
                    variant={fulfilmentTone(status)} // Each fulfilment state reads in its own tone.
                  >
                    {fulfilmentLabel(status)}
                  </Tag>
                  {status === 'new' ? (
                    <Tag
                      size="xs" // Fits the dense table row.
                      variant="info" // New stands out from the other states.
                    >
                      New
                    </Tag>
                  ) : null}
                </span>
              )}
            </OrderTable.Column>
          </OrderTable>
        )}
      </div>
    </>
  );
}
