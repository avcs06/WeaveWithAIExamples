'use client';

// Loads its records through listOrders, listPieces.
import { formatINR } from '@app/blocks/money';
import {
  fulfilmentLabel,
  fulfilmentTone,
  paymentLabel,
  paymentTone,
} from '@app/blocks/orderStatus';
import { LOW_STOCK_AT, variantCombos } from '@app/blocks/stock';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { useListOrders } from '@app/entities/order';
import { useListPieces } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Numeral } from '@packages/ui/Numeral';
import { Section } from '@packages/ui/Section';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { Paragraph, Time } from '@packages/ui/Typography';
import React from 'react';

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

type LowRow = {
  key: string;
  pieceId: string;
  name: string;
  glaze: string;
  size: string;
  stock: number;
};

const OrderTable = createTable<OrderRow>();
const LowTable = createTable<LowRow>();

export default function DashboardPage() {
  const {
    data: orders,
    loading: ordersLoading,
    error: ordersError,
    retry: retryOrders,
  } = useListOrders();
  const {
    data: pieces,
    loading: piecesLoading,
    error: piecesError,
    retry: retryPieces,
  } = useListPieces();

  const loading = ordersLoading || piecesLoading;
  const error = ordersError || piecesError;

  if (loading) {
    return (
      <LoadingView
        title="Dashboard"
        description="Today's shop summary"
        message="Loading today's shop summary…"
      />
    );
  }

  if (error) {
    return (
      <LoadFailedView
        title="Dashboard"
        description="Today's shop summary"
        message="Something went wrong while loading the dashboard."
        onRetry={() => {
          retryOrders();
          retryPieces();
        }}
      />
    );
  }

  const allOrders = [...(orders ?? [])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const newOrders = allOrders.filter(
    (order) => order.fulfilmentStatus === 'new',
  );
  const totalSales = allOrders.reduce((sum, order) => sum + order.total, 0);

  const lowVariants: LowRow[] = (pieces ?? []).flatMap((piece) =>
    variantCombos(piece)
      .filter((combo) => combo.stock <= LOW_STOCK_AT)
      .map((combo) => ({
        key: `${piece.id}-${combo.glazeIndex}-${combo.sizeIndex}`,
        pieceId: piece.id,
        name: piece.name,
        glaze: combo.glaze,
        size: combo.size,
        stock: combo.stock,
      })),
  );

  if (allOrders.length === 0 && (pieces ?? []).length === 0) {
    return (
      <>
        <PageHeader title="Dashboard" description="Today's shop summary" />
        <div className="flex-col-gap-4 items-start">
          <Paragraph>No orders yet and no pieces yet.</Paragraph>
          <Button as={NextLink} href="/studio/pieces/new">
            Add a piece
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Dashboard" description="Today's shop summary" />
      <div className="flex-row-gap-6 flex-wrap">
        <div className="flex-col-gap-1">
          <Paragraph>New orders</Paragraph>
          <span className="text-heading">
            <Numeral>{newOrders.length}</Numeral>
          </span>
        </div>
        <div className="flex-col-gap-1">
          <Paragraph>Total sales</Paragraph>
          <span className="text-heading">
            <Numeral>{formatINR(totalSales)}</Numeral>
          </span>
        </div>
        <div className="flex-col-gap-1">
          <Paragraph>Variants low on stock</Paragraph>
          <span className="text-heading">
            <Numeral>{lowVariants.length}</Numeral>
          </span>
        </div>
      </div>
      <div className="flex-row-gap-6 flex-wrap items-start">
        <Section title="New orders">
          {newOrders.length === 0 ? (
            <Paragraph>
              No new orders. New guest orders will appear here.
            </Paragraph>
          ) : (
            <>
              <OrderTable
                caption="New orders"
                data={newOrders.map((order) => ({
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
                    <NextLink href={`/orders/${row.id}`}>
                      {reference}
                    </NextLink>
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
              <NextLink look="plain" href="/orders">
                Orders
              </NextLink>
            </>
          )}
        </Section>
        <Section title="Low stock">
          {lowVariants.length === 0 ? (
            <Paragraph>Nothing is low on stock.</Paragraph>
          ) : (
            <>
              <LowTable
                caption="Low stock warnings"
                data={lowVariants}
                rowKey={(row) => row.key}
                onRowClick={(_, click) =>
                  click.currentTarget.querySelector('a')?.click()
                }
              >
                <LowTable.Column
                  id="name"
                  rowHeader
                  title="Piece"
                  dataKey="name"
                  width={220}
                >
                  {(name, row) => (
                    <NextLink href={`/studio/pieces/${row.pieceId}`}>
                      {name}
                    </NextLink>
                  )}
                </LowTable.Column>
                <LowTable.Column
                  id="glaze"
                  title="Glaze"
                  dataKey="glaze"
                  width={140}
                />
                <LowTable.Column
                  id="size"
                  title="Size"
                  dataKey="size"
                  width={110}
                />
                <LowTable.Column
                  id="stock"
                  title="Left"
                  dataKey="stock"
                  width={90}
                  align="right"
                >
                  {(stock) => <Numeral>{stock}</Numeral>}
                </LowTable.Column>
                <LowTable.Column
                  id="status"
                  title="Status"
                  dataKey="stock"
                  width={120}
                >
                  {(stock) => (
                    <Tag
                      size="xs" // Fits the dense table row.
                      variant={stock <= 0 ? 'error' : 'warning'} // Sold out reads as urgent, low stock as waiting.
                    >
                      {stock <= 0 ? 'Sold out' : 'Low stock'}
                    </Tag>
                  )}
                </LowTable.Column>
              </LowTable>
              <NextLink look="plain" href="/studio/pieces">
                Pieces
              </NextLink>
            </>
          )}
        </Section>
      </div>
    </>
  );
}
