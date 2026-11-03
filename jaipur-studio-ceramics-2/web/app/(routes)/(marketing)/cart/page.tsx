'use client';

import { useCartStore, type CartLine } from '@app/blocks/Cart';
import { rupees } from '@app/blocks/orders';
import { findVariant, sizeLabel } from '@app/blocks/pieces';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { useListPieces, type Piece } from '@app/entities/piece';
import { Button, IconButton } from '@packages/ui/Button';
import { QuantitySelector } from '@packages/ui/Input';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { toast } from '@packages/ui/Toast';
import { Truncate } from '@packages/ui/Truncate';
import { Caption, Paragraph } from '@packages/ui/Typography';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const lineKey = (line: CartLine) =>
  `${line.pieceId}|${line.glaze}|${line.size}`;

const CartTable = createTable<CartLine>();

const stockOf = (
  pieces: Piece[],
  line: CartLine,
): { piece: boolean; stock: number } => {
  const piece = pieces.find((entry) => entry.id === line.pieceId);
  if (!piece) return { piece: false, stock: 0 };
  return {
    piece: true,
    stock: findVariant(piece, line.glaze, line.size)?.stock ?? 0,
  };
};

/** One cart line's quantity: typed freely, saved only when it fits the stock. */
const LineQuantity = ({
  line,
  stock,
}: {
  line: CartLine;
  stock: number;
}) => {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const total = useCartStore((state) =>
    state.lines.reduce((sum, entry) => sum + entry.price * entry.quantity, 0),
  );
  const [draft, setDraft] = useState<number | null>(line.quantity);

  const error =
    draft === null || draft < 1
      ? 'Enter a quantity of at least 1.'
      : draft > stock
        ? `Only ${stock} left for ${line.glaze} in ${sizeLabel(line.size)}.`
        : undefined;

  return (
    <QuantitySelector
      aria-label={`Quantity of ${line.title}, ${line.glaze}, ${sizeLabel(line.size)}`}
      autoComplete="off"
      value={draft}
      onChange={(next) => {
        setDraft(next);
        if (next !== null && next >= 1 && next <= stock) {
          setQuantity(line.pieceId, line.glaze, line.size, next);
          toast({
            title: 'Cart updated',
            description: `The cart total is ${rupees.format(
              total - line.price * line.quantity + line.price * next,
            )}.`,
            status: 'success',
          });
        }
      }}
      min={1}
      max={Math.max(stock, 1)}
      maxReason={`Only ${stock} in stock`}
      error={error}
    />
  );
};

/** The buyer's cart: quantities within stock, remove, then checkout. */
export default function CartPage() {
  const router = useRouter();
  const pieces = useListPieces();
  const lines = useCartStore((state) => state.lines);
  const removeLine = useCartStore((state) => state.removeLine);
  const [blocked, setBlocked] = useState('');

  const total = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  const proceed = () => {
    const records = pieces.data ?? [];
    const problems = lines.filter(
      (line) => stockOf(records, line).stock < line.quantity,
    );
    if (problems.length > 0) {
      setBlocked(
        `No longer available in the wanted quantity: ${problems
          .map((line) => `${line.title}, ${line.glaze} in ${sizeLabel(line.size)}`)
          .join('; ')}. Adjust the cart before checkout.`,
      );
      return;
    }
    setBlocked('');
    router.push('/checkout');
  };

  return (
    <>
      <PageHeader
        title="Your cart"
        description={
          lines.length > 0
            ? `${count} ${count === 1 ? 'item' : 'items'} in your cart.`
            : undefined
        }
      />
      <PageState
        loading={pieces.loading}
        loadingText="Loading your cart."
        errorText={pieces.error ? 'The stock could not be loaded.' : undefined}
        onRetry={pieces.retry}
      />
      {!pieces.loading && !pieces.error && lines.length === 0 ? (
        <div className="flex-col-gap-3 items-start">
          <Paragraph role="status">Your cart is empty.</Paragraph>
          <Button as={NextLink} href="/shop">
            Browse pieces
          </Button>
        </div>
      ) : !pieces.loading && !pieces.error ? (
        <>
          {blocked ? (
            <Paragraph color="error" role="alert">
              {blocked}
            </Paragraph>
          ) : null}
          <CartTable
            caption="Cart lines"
            data={lines}
            rowKey={lineKey}
          >
            <CartTable.Column
              id="title"
              rowHeader
              title="Piece"
              dataKey="title"
              width={240}
            >
              {(title, line) => (
                <div className="flex-col-gap-1 min-w-0">
                  <NextLink
                    href={`/shop/${line.pieceId}`}
                    className="inline-block max-w-full"
                  >
                    <Truncate>{title}</Truncate>
                  </NextLink>
                  <Caption>
                    {line.glaze} · {sizeLabel(line.size)}
                  </Caption>
                </div>
              )}
            </CartTable.Column>
            <CartTable.Column
              id="price"
              title="Price"
              dataKey="price"
              width={120}
              align="right"
            >
              {(price) => <Numeral>{rupees.format(price)}</Numeral>}
            </CartTable.Column>
            <CartTable.Column
              id="quantity"
              title="Quantity"
              dataKey="quantity"
              width={220}
            >
              {(_, line) => (
                <LineQuantity line={line} stock={stockOf(pieces.data ?? [], line).stock} />
              )}
            </CartTable.Column>
            <CartTable.Column
              id="lineTotal"
              title="Line total"
              dataKey="quantity"
              width={130}
              align="right"
            >
              {(_, line) => (
                <Numeral>{rupees.format(line.price * line.quantity)}</Numeral>
              )}
            </CartTable.Column>
            <CartTable.Column
              id="remove"
              title={<span className="sr-only">Remove</span>}
              width={48}
              align="right"
            >
              {(_, line) => (
                <IconButton
                  // A row remove stays quiet beside the row's quantity.
                  variant="danger"
                  // The ghost look keeps the remove as quiet as the row.
                  look="ghost"
                  tooltip="Remove line"
                  aria-label={`Remove ${line.title}, ${line.glaze}, ${sizeLabel(line.size)}`}
                  onClick={() => {
                    removeLine(line.pieceId, line.glaze, line.size);
                    toast({
                      title: 'Removed from cart',
                      description: `${line.title} (${line.glaze}, ${sizeLabel(line.size)}) is out of the cart.`,
                      status: 'success',
                    });
                  }}
                >
                  <Trash2 />
                </IconButton>
              )}
            </CartTable.Column>
          </CartTable>
          <div className="flex-row-gap-2 items-center">
            <p>
              Cart total: <Numeral>{rupees.format(total)}</Numeral>
            </p>
          </div>
          <div className="flex-row-gap-2 flex-wrap items-center">
            <Button
              // Going back to browse is the quiet way out beside checkout.
              variant="base"
              as={NextLink}
              href="/shop"
            >
              Continue browsing
            </Button>
            <Button onClick={proceed}>Proceed to checkout</Button>
          </div>
        </>
      ) : null}
    </>
  );
}
