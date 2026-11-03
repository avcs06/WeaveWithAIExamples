'use client';

// Loads its record through getPiece.
import { formatINR } from '@app/blocks/money';
import { availabilityLabel, stockFor } from '@app/blocks/stock';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { addCartLine } from '@app/entities/cart';
import { useGetPiece } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Chip, ChipGroup } from '@packages/ui/Chip';
import { Image } from '@packages/ui/Image';
import { QuantitySelector } from '@packages/ui/Input';
import { Numeral } from '@packages/ui/Numeral';
import { toast } from '@packages/ui/Toast';
import { Paragraph } from '@packages/ui/Typography';
import React, { useState } from 'react';

export default function PiecePage({
  params,
}: {
  params: Promise<{ pieceId: string }>;
}) {
  const { pieceId } = React.use(params);
  const { data: piece, loading, error, retry } = useGetPiece(pieceId);
  const [glazeChoice, setGlazeChoice] = useState('');
  const [sizeChoice, setSizeChoice] = useState('');
  const [quantity, setQuantity] = useState<number | null>(1);
  const [notice, setNotice] = useState<string | null>(null);

  if (loading) {
    return (
      <LoadingView
        title="Piece"
        breadcrumb={[{ label: 'Browse pieces', href: '/pieces' }]}
        message="Loading the piece…"
      />
    );
  }

  if (error) {
    return (
      <LoadFailedView
        title="Piece"
        breadcrumb={[{ label: 'Browse pieces', href: '/pieces' }]}
        message="Something went wrong while loading the piece."
        onRetry={retry}
      />
    );
  }

  if (!piece) {
    return (
      <NotFound
        title="This piece is no longer available."
        description="It may have been removed, or the link is wrong."
        back={{ label: 'Browse pieces', href: '/pieces' }}
      />
    );
  }

  const glaze = glazeChoice || piece.glaze[0] || '';
  const size = sizeChoice || piece.size[0] || '';
  const stock = stockFor(piece, glaze, size) ?? 0;
  const soldOut = stock <= 0;
  const quantityError =
    quantity === null || !Number.isInteger(quantity) || quantity < 1
      ? 'Choose a quantity of 1 or more.'
      : null;
  const lineTotal = (quantity ?? 0) * piece.price;

  const add = () => {
    if (quantityError) {
      setNotice(quantityError);
      return;
    }
    if (soldOut) {
      setNotice('That glaze and size is sold out and cannot be ordered.');
      return;
    }
    if ((quantity ?? 0) > stock) {
      setQuantity(stock);
      setNotice(`Only ${stock} left for this glaze and size.`);
      return;
    }
    addCartLine({
      pieceId: piece.id,
      glaze,
      size,
      quantity: quantity ?? 0,
    });
    setNotice(null);
    toast({
      title: 'Added to cart',
      description: `${quantity} × ${piece.name} (${glaze}, ${size}), subtotal ${formatINR(lineTotal)}.`,
      status: 'success',
    });
  };

  return (
    <>
      <PageHeader
        title={piece.name}
        breadcrumb={[{ label: 'Browse pieces', href: '/pieces' }]}
      />
      <div className="flex-row-gap-6 flex-wrap items-start">
        <div className="flex-col-gap-4">
          {piece.photos.map((photo) => (
            <Image
              key={photo}
              src={photo}
              alt={`Photo of ${piece.name}`}
              width={400}
              height={300}
              fit="cover"
            />
          ))}
        </div>
        <div className="flex-col-gap-4 items-start">
          {piece.description ? (
            <Paragraph>{piece.description}</Paragraph>
          ) : null}
          <Paragraph>
            <Numeral>{formatINR(piece.price)}</Numeral>
          </Paragraph>
          <ChipGroup
            mode="single"
            label="Glaze"
            value={glaze}
            onChange={setGlazeChoice}
            className="flex-row-gap-2 flex-wrap"
          >
            {piece.glaze.map((option) => (
              <Chip key={option} value={option}>
                {option}
              </Chip>
            ))}
          </ChipGroup>
          <ChipGroup
            mode="single"
            label="Size"
            value={size}
            onChange={setSizeChoice}
            className="flex-row-gap-2 flex-wrap"
          >
            {piece.size.map((option) => (
              <Chip key={option} value={option}>
                {option}
              </Chip>
            ))}
          </ChipGroup>
          <QuantitySelector
            aria-label={`Quantity of ${piece.name}`}
            autoComplete="off"
            value={quantity}
            onChange={(next) => {
              setQuantity(next);
              setNotice(null);
            }}
            min={1}
            max={soldOut ? 1 : stock}
            maxReason={
              soldOut
                ? 'That glaze and size is sold out'
                : `Only ${stock} left`
            }
            error={
              quantityError && notice === quantityError ? notice : undefined
            }
          />
          <Paragraph>
            {soldOut
              ? 'That glaze and size is sold out and cannot be ordered.'
              : availabilityLabel(stock)}
          </Paragraph>
          <Paragraph>
            Line total <Numeral>{formatINR(lineTotal)}</Numeral>
          </Paragraph>
          {notice && notice !== quantityError ? (
            <Paragraph>{notice}</Paragraph>
          ) : null}
          <div className="flex-row-gap-2 flex-wrap">
            <Button
              disabledWithReason={
                soldOut
                  ? 'That glaze and size is sold out and cannot be ordered.'
                  : undefined
              }
              onClick={add}
            >
              Add to cart
            </Button>
            <Button
              variant="base" // Opening the cart is the quiet step after adding.
              as={NextLink}
              href="/cart"
            >
              Open cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
