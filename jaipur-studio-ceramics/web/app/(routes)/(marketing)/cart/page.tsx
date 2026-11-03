'use client';

// Loads its records through listPieces.
import { COURIER_FEE, FREE_SHIPPING_ABOVE } from '@app/blocks/cartTotals';
import { formatINR } from '@app/blocks/money';
import { stockFor } from '@app/blocks/stock';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import {
  removeCartLine,
  updateCartLine,
  useCartLines,
} from '@app/entities/cart';
import { useListPieces } from '@app/entities/piece';
import { Button, IconButton } from '@packages/ui/Button';
import { QuantitySelector } from '@packages/ui/Input';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { toast } from '@packages/ui/Toast';
import { Caption, Paragraph } from '@packages/ui/Typography';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

type CartRow = {
  key: string;
  index: number;
  pieceId: string;
  name: string;
  glaze: string;
  size: string;
  price: number;
  quantity: number;
  draft: number | null | undefined;
  stock: number;
};

const CartTable = createTable<CartRow>();

export default function CartPage() {
  const { data: pieces, loading, error, retry } = useListPieces();
  const lines = useCartLines();
  const [drafts, setDrafts] = useState<Record<string, number | null>>({});
  const [saveError, setSaveError] = useState<{
    message: string;
    retry: () => void;
  } | null>(null);

  if (loading) {
    return <LoadingView title="Your cart" message="Loading your cart…" />;
  }

  if (error) {
    return (
      <LoadFailedView
        title="Your cart"
        message="Something went wrong while loading the pieces."
        onRetry={retry}
      />
    );
  }

  const all = pieces ?? [];

  if (lines.length === 0) {
    return (
      <>
        <PageHeader title="Your cart" />
        <div className="flex-col-gap-4 items-start">
          <Paragraph>
            Your cart is empty. Browse pieces to start your order.
          </Paragraph>
          <Button as={NextLink} href="/pieces">
            Browse pieces
          </Button>
        </div>
      </>
    );
  }

  const rows: CartRow[] = lines.map((line, index) => {
    const piece = all.find((entry) => entry.id === line.pieceId);
    return {
      key: `${line.pieceId}-${line.glaze}-${line.size}-${index}`,
      index,
      pieceId: line.pieceId,
      name: piece?.name ?? 'A piece that is no longer available',
      glaze: line.glaze,
      size: line.size,
      price: piece?.price ?? 0,
      quantity: line.quantity,
      draft: drafts[String(index)],
      stock: piece ? (stockFor(piece, line.glaze, line.size) ?? 0) : 0,
    };
  });

  const shownQuantity = (row: CartRow): number | null =>
    row.draft !== undefined ? row.draft : row.quantity;

  const quantityInvalid = (row: CartRow): boolean => {
    const value = shownQuantity(row);
    return (
      value === null ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > row.stock
    );
  };

  const commitQuantity = (row: CartRow, next: number | null) => {
    if (
      next === null ||
      !Number.isInteger(next) ||
      next < 1 ||
      next > row.stock
    ) {
      setDrafts((current) => ({ ...current, [row.index]: next }));
      return;
    }
    try {
      if (next !== row.quantity) {
        updateCartLine(row.index, next);
        toast({
          title: 'Cart updated',
          description: `${next} × ${row.name} in ${row.glaze}, ${row.size}.`,
          status: 'success',
        });
      }
      setDrafts((current) => {
        const { [row.index]: _dropped, ...rest } = current;
        return rest;
      });
      setSaveError(null);
    } catch {
      setDrafts((current) => ({ ...current, [row.index]: next }));
      setSaveError({
        message: 'Could not save the cart change.',
        retry: () => commitQuantity(row, next),
      });
    }
  };

  const removeLine = (row: CartRow) => {
    try {
      removeCartLine(row.index);
      setSaveError(null);
      toast({
        title: 'Removed from cart',
        description: `${row.name} in ${row.glaze}, ${row.size} is out.`,
        status: 'success',
      });
    } catch {
      setSaveError({
        message: 'Could not remove the line.',
        retry: () => removeLine(row),
      });
    }
  };

  const subtotal = rows.reduce(
    (sum, row) => sum + row.price * row.quantity,
    0,
  );
  const shorts = rows.filter((row) => row.quantity > row.stock);

  return (
    <>
      <PageHeader title="Your cart" />
      <div className="flex-col-gap-4 items-start">
        <CartTable
          caption="Cart lines"
          data={rows}
          rowKey={(row) => row.key}
          onRowClick={(_, click) =>
            click.currentTarget.querySelector('a')?.click()
          }
        >
          <CartTable.Column
            id="name"
            rowHeader
            title="Piece"
            dataKey="name"
            width={220}
          >
            {(name, row) => (
              <NextLink href={`/pieces/${row.pieceId}`}>{name}</NextLink>
            )}
          </CartTable.Column>
          <CartTable.Column
            id="glaze"
            title="Glaze"
            dataKey="glaze"
            width={140}
          />
          <CartTable.Column id="size" title="Size" dataKey="size" width={110} />
          <CartTable.Column
            id="price"
            title="Price"
            dataKey="price"
            width={120}
            align="right"
          >
            {(price) => <Numeral>{formatINR(price)}</Numeral>}
          </CartTable.Column>
          <CartTable.Column
            id="quantity"
            title="Quantity"
            dataKey="quantity"
            width={200}
          >
            {(_, row) => {
              const invalid = quantityInvalid(row);
              return (
                <div className="flex-col-gap-1">
                  <QuantitySelector
                    aria-label={`Quantity of ${row.name} in ${row.glaze}, ${row.size}`}
                    autoComplete="off"
                    value={shownQuantity(row)}
                    onChange={(next) => commitQuantity(row, next)}
                    min={1}
                    max={Math.max(row.stock, 1)}
                    maxReason={
                      row.stock <= 0
                        ? 'No stock left for this glaze and size'
                        : `Only ${row.stock} left`
                    }
                    error={
                      invalid ? 'Choose a quantity within stock.' : undefined
                    }
                  />
                  {invalid ? (
                    <Caption>
                      Only {row.stock} left for {row.glaze}, {row.size}.
                    </Caption>
                  ) : null}
                </div>
              );
            }}
          </CartTable.Column>
          <CartTable.Column
            id="total"
            title="Total"
            dataKey="quantity"
            width={120}
            align="right"
          >
            {(_, row) => (
              <Numeral>{formatINR(row.price * row.quantity)}</Numeral>
            )}
          </CartTable.Column>
          <CartTable.Column
            id="actions"
            title={<span className="sr-only">Actions</span>}
            width={56}
            align="right"
          >
            {(_, row) => (
              <IconButton
                variant="base" // Quiet row action beside the quantity.
                look="ghost"
                tooltip={`Remove ${row.name}`}
                aria-label={`Remove ${row.name} in ${row.glaze}, ${row.size}`}
                onClick={() => removeLine(row)}
              >
                <Trash2 />
              </IconButton>
            )}
          </CartTable.Column>
        </CartTable>
        {shorts.map((row) => (
          <Paragraph key={`short-${row.key}`}>
            Only {row.stock} left for {row.name} in {row.glaze}, {row.size}.
            Change the quantity before checkout.
          </Paragraph>
        ))}
        {saveError ? (
          <div className="flex-row-gap-2 flex-wrap items-center">
            <Paragraph>{saveError.message}</Paragraph>
            <Button
              variant="base" // Quiet retry beside the message it answers.
              onClick={() => {
                saveError.retry();
              }}
            >
              Try again
            </Button>
          </div>
        ) : null}
        <Paragraph>
          Subtotal <Numeral>{formatINR(subtotal)}</Numeral>
        </Paragraph>
        <Paragraph>
          Courier delivery is {formatINR(COURIER_FEE)}, free when the
          discounted subtotal is more than {formatINR(FREE_SHIPPING_ABOVE)}.
          Studio pickup is free.
        </Paragraph>
        <div className="flex-row-gap-2 flex-wrap">
          <Button as={NextLink} href="/checkout">
            Go to checkout
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
