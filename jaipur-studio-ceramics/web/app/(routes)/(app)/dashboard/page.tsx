'use client';

import { rupees } from '@app/blocks/orders';
import { pieceVariants, sizeLabel } from '@app/blocks/pieces';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { useListOrders } from '@app/entities/order';
import { useListPieces } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { CardList } from '@packages/ui/Card';
import { Numeral } from '@packages/ui/Numeral';
import { Section } from '@packages/ui/Section';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { Truncate } from '@packages/ui/Truncate';
import { Paragraph } from '@packages/ui/Typography';
import React from 'react';

type NewOrderRow = {
  id: string;
  orderReference: string;
  name: string;
  total: number;
  fulfilmentChoice: 'studio_pickup' | 'courier_delivery';
};

type AttentionRow = {
  key: string;
  pieceId: string;
  title: string;
  glaze: string;
  size: string;
  stock: number;
};

const NewOrdersTable = createTable<NewOrderRow>();
const AttentionTable = createTable<AttentionRow>();

const fulfilmentLabel = (choice: NewOrderRow['fulfilmentChoice']) =>
  choice === 'studio_pickup' ? 'Studio pickup' : 'Courier delivery';

/** Home: new orders and pieces running low, at a glance. */
export default function DashboardHomePage() {
  const orders = useListOrders();
  const pieces = useListPieces();

  const loading = orders.loading || pieces.loading;
  const failed = Boolean(orders.error ?? pieces.error);

  if (loading || failed) {
    return (
      <>
        <PageHeader title="Home" />
        <PageState
          loading={loading}
          loadingText="Loading the dashboard."
          errorText={failed ? 'The dashboard could not be loaded.' : undefined}
          onRetry={() => {
            orders.retry();
            pieces.retry();
          }}
        />
      </>
    );
  }

  const allOrders = [...(orders.data ?? [])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const newOrders = allOrders.filter(
    (order) => order.fulfilmentStatus === 'new',
  );
  const allPieces = pieces.data ?? [];
  const lowVariants: AttentionRow[] = [];
  for (const piece of allPieces) {
    for (const variant of pieceVariants(piece)) {
      if (variant.stock <= 3) {
        lowVariants.push({
          key: `${piece.id}|${variant.glaze}|${variant.size}`,
          pieceId: piece.id,
          title: piece.title,
          glaze: variant.glaze,
          size: variant.size,
          stock: variant.stock,
        });
      }
    }
  }
  const soldOutCount = lowVariants.filter(
    (row) => row.stock <= 0,
  ).length;

  if (allOrders.length === 0 && allPieces.length === 0) {
    return (
      <>
        <PageHeader title="Home" />
        <Paragraph>No orders yet.</Paragraph>
        <Paragraph>No pieces yet.</Paragraph>
        <div className="flex-row-gap-2 flex-wrap items-center">
          <Button as={NextLink} href="/dashboard/pieces/new">
            Add a piece
          </Button>
          <Button
            // Opening orders is the quiet way out beside adding the first piece.
            variant="base"
            as={NextLink}
            href="/dashboard/orders"
          >
            Open orders
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Home" />
      <CardList
        aria-label="Shop at a glance"
        items={[
          { id: 'new', label: 'New orders', value: newOrders.length },
          { id: 'low', label: 'Low stock variants', value: lowVariants.length },
          { id: 'out', label: 'Sold out variants', value: soldOutCount },
        ]}
        layout="grid"
        // Three figures take one row of three, so none sits alone.
        columns={3}
        renderItem={(stat) => (
          <>
            <span>{stat.label}</span>
            <span className="text-heading">
              <Numeral>{stat.value}</Numeral>
            </span>
          </>
        )}
      />
      <Section
        title="New orders"
        headerAction={
          <Button
            // Seeing every order is the section's own action.
            variant="base"
            as={NextLink}
            href="/dashboard/orders"
          >
            View all orders
          </Button>
        }
      >
        {newOrders.length === 0 ? (
          <Paragraph role="status">
            No new orders. New orders will appear here.
          </Paragraph>
        ) : (
          <NewOrdersTable
            caption="New orders"
            data={newOrders.map((order) => ({
              id: order.id,
              orderReference: order.orderReference,
              name: order.name,
              total: order.total,
              fulfilmentChoice: order.fulfilmentChoice,
            }))}
            rowKey={(order) => order.id}
            onRowClick={(_, click) =>
              click.currentTarget.querySelector('a')?.click()
            }
          >
            <NewOrdersTable.Column
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
            </NewOrdersTable.Column>
            <NewOrdersTable.Column
              id="name"
              title="Buyer"
              dataKey="name"
              width={200}
            >
              {(name) => <Truncate>{name}</Truncate>}
            </NewOrdersTable.Column>
            <NewOrdersTable.Column
              id="total"
              title="Total"
              dataKey="total"
              width={130}
              align="right"
            >
              {(total) => <Numeral>{rupees.format(total)}</Numeral>}
            </NewOrdersTable.Column>
            <NewOrdersTable.Column
              id="fulfilmentChoice"
              title="Fulfilment"
              dataKey="fulfilmentChoice"
              width={170}
            >
              {(choice: NewOrderRow['fulfilmentChoice']) =>
                fulfilmentLabel(choice)
              }
            </NewOrdersTable.Column>
            <NewOrdersTable.Column
              id="status"
              title="Status"
              dataKey="id"
              width={110}
            >
              {() => (
                <Tag
                  // New orders must stand out from the rest.
                  variant="info"
                >
                  New
                </Tag>
              )}
            </NewOrdersTable.Column>
          </NewOrdersTable>
        )}
      </Section>
      <Section title="Pieces needing attention">
        {lowVariants.length === 0 ? (
          <Paragraph role="status">
            Every variant is well stocked.
          </Paragraph>
        ) : (
          <AttentionTable
            caption="Pieces needing attention"
            data={lowVariants}
            rowKey={(row) => row.key}
            onRowClick={(_, click) =>
              click.currentTarget.querySelector('a')?.click()
            }
          >
            <AttentionTable.Column
              id="title"
              rowHeader
              title="Piece"
              dataKey="title"
              width={240}
            >
              {(title, row) => (
                <NextLink
                  href={`/dashboard/pieces/${row.pieceId}`}
                  className="inline-block max-w-full"
                >
                  <Truncate>{title}</Truncate>
                </NextLink>
              )}
            </AttentionTable.Column>
            <AttentionTable.Column
              id="glaze"
              title="Glaze"
              dataKey="glaze"
              width={170}
            />
            <AttentionTable.Column
              id="size"
              title="Size"
              dataKey="size"
              width={110}
            >
              {(size) => sizeLabel(size)}
            </AttentionTable.Column>
            <AttentionTable.Column
              id="stock"
              title="Left"
              dataKey="stock"
              width={90}
              align="right"
            >
              {(stock) => <Numeral>{stock}</Numeral>}
            </AttentionTable.Column>
            <AttentionTable.Column
              id="state"
              title="State"
              dataKey="stock"
              width={130}
            >
              {(stock) =>
                stock <= 0 ? (
                  <Tag
                    // Sold out decides the next batch, so it reads as an error.
                    variant="error"
                  >
                    Sold out
                  </Tag>
                ) : (
                  <Tag
                    // Three or fewer left is the owner's restock signal.
                    variant="warning"
                  >
                    Low stock
                  </Tag>
                )
              }
            </AttentionTable.Column>
          </AttentionTable>
        )}
      </Section>
    </>
  );
}
