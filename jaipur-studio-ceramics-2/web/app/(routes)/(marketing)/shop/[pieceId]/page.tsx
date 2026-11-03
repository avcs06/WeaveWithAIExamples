'use client';

import { useCartStore } from '@app/blocks/Cart';
import { rupees } from '@app/blocks/orders';
import { findVariant, pieceVariants, sizeLabel } from '@app/blocks/pieces';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { PieceCategoryOptions } from '@app/entities/enums';
import { useGetPiece } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Chip, ChipGroup } from '@packages/ui/Chip';
import { Image } from '@packages/ui/Image';
import { QuantitySelector } from '@packages/ui/Input';
import { Numeral } from '@packages/ui/Numeral';
import { Tag } from '@packages/ui/Tag';
import { toast } from '@packages/ui/Toast';
import {
  Caption,
  List,
  ListItem,
  Paragraph,
} from '@packages/ui/Typography';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

/** One piece with its variants: choose a glaze, size and quantity. */
export default function PiecePage() {
  const { pieceId } = useParams<{ pieceId: string }>();
  const piece = useGetPiece(pieceId);
  const addLine = useCartStore((state) => state.addLine);

  const [glaze, setGlaze] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState<number | null>(1);
  const [notice, setNotice] = useState('');

  if (piece.loading || piece.error) {
    return (
      <PageState
        loading={piece.loading}
        loadingText="Loading the piece."
        errorText={piece.error ? 'The piece could not be loaded.' : undefined}
        onRetry={piece.retry}
      />
    );
  }

  const record = piece.data;
  if (!record) {
    return (
      <NotFound
        title="Piece not found"
        description="This piece is gone."
        back={{ label: 'Back to the shop', href: '/shop' }}
      />
    );
  }

  const variants = pieceVariants(record);
  const glazes = [...new Set(variants.map((variant) => variant.glaze))];
  const sizes = [...new Set(variants.map((variant) => variant.size))];
  const firstInStock = variants.find((variant) => variant.stock > 0);
  const chosenGlaze = glaze || firstInStock?.glaze || variants[0]?.glaze || '';
  const chosenSize = size || firstInStock?.size || variants[0]?.size || '';
  const chosen = findVariant(record, chosenGlaze, chosenSize);
  const categoryLabel =
    PieceCategoryOptions.find((option) => option.key === record.category)
      ?.label ?? record.category;

  /** Picking a glaze keeps a size it is made in, preferring one in stock. */
  const pickGlaze = (next: string) => {
    setGlaze(next);
    if (!variants.some((variant) => variant.glaze === next && variant.size === chosenSize)) {
      const keep =
        variants.find((variant) => variant.glaze === next && variant.stock > 0) ??
        variants.find((variant) => variant.glaze === next);
      if (keep) setSize(keep.size);
    }
  };

  /** Picking a size keeps a glaze it is made in, preferring one in stock. */
  const pickSize = (next: string) => {
    setSize(next);
    if (!variants.some((variant) => variant.size === next && variant.glaze === chosenGlaze)) {
      const keep =
        variants.find((variant) => variant.size === next && variant.stock > 0) ??
        variants.find((variant) => variant.size === next);
      if (keep) setGlaze(keep.glaze);
    }
  };
  const stock = chosen?.stock ?? 0;
  const soldOut = !chosen || stock <= 0;

  const quantityError =
    quantity === null || quantity < 1
      ? 'Enter a quantity of at least 1.'
      : quantity > stock
        ? `Only up to ${stock} can be ordered.`
        : undefined;

  const addToCart = () => {
    if (!chosen || chosen.stock <= 0) {
      setNotice(
        chosen
          ? `${chosenGlaze} in ${sizeLabel(chosenSize)} just sold out. Pick another glaze or size.`
          : 'Those glaze and size are not made together. Pick another glaze or size.',
      );
      return;
    }
    if (quantity === null || quantity < 1 || quantity > chosen.stock) {
      setNotice(
        `Only up to ${chosen.stock} can be ordered. ${chosen.stock} left for ${chosenGlaze} in ${sizeLabel(chosenSize)}.`,
      );
      return;
    }
    addLine({
      pieceId: record.id,
      title: record.title,
      glaze: chosenGlaze,
      size: chosenSize,
      price: record.price,
      quantity,
    });
    setNotice('');
    toast({
      title: 'Added to cart',
      description: `${quantity} × ${record.title} (${chosenGlaze}, ${sizeLabel(chosenSize)}).`,
      status: 'success',
    });
  };

  return (
    <>
      <PageHeader
        title={record.title}
        breadcrumb={[{ label: 'Shop', href: '/shop' }]}
      />
      <div className="grid gap-6 grid-cols-2 items-start">
        <div className="flex-col-gap-4">
          {record.photos.map((photo, index) => (
            <Image
              key={photo}
              src={photo}
              alt={
                index === 0
                  ? `Photo of ${record.title}`
                  : `Another photo of ${record.title}`
              }
              width={600}
              height={450}
              fit="cover"
            />
          ))}
        </div>
        <div className="flex-col-gap-4">
          <Paragraph>{record.description}</Paragraph>
          <div className="flex-row-gap-2 items-center">
            <Tag>{categoryLabel}</Tag>
          </div>
          <p className="text-heading">
            <Numeral>{rupees.format(record.price)}</Numeral>
          </p>
          <List aria-label="Stock by variant">
            {variants.map((variant) => (
              <ListItem key={variant.index}>
                {variant.glaze}, {sizeLabel(variant.size)}:{' '}
                {variant.stock <= 0
                  ? 'sold out'
                  : `${variant.stock} left`}
              </ListItem>
            ))}
          </List>
          <ChipGroup
            label="Glaze"
            value={chosenGlaze}
            onChange={(next) => next && pickGlaze(next)}
            className="flex-row-gap-2 flex-wrap"
          >
            {glazes.map((option) => (
              <Chip key={option} value={option}>
                {option}
              </Chip>
            ))}
          </ChipGroup>
          <ChipGroup
            label="Size"
            value={chosenSize}
            onChange={(next) => next && pickSize(next)}
            className="flex-row-gap-2 flex-wrap"
          >
            {sizes.map((option) => (
              <Chip key={option} value={option}>
                {sizeLabel(option)}
              </Chip>
            ))}
          </ChipGroup>
          {soldOut ? (
            <div className="flex-col-gap-2 items-start">
              <Tag
                // Sold out blocks ordering, so it reads as an error.
                variant="error"
              >
                Sold out
              </Tag>
              <Paragraph>
                This glaze and size is sold out. Pick another glaze or size.
              </Paragraph>
            </div>
          ) : (
            <>
              <Caption>
                {stock} left for {chosenGlaze} in {sizeLabel(chosenSize)}
              </Caption>
              <QuantitySelector
                aria-label={`Quantity of ${record.title}, ${chosenGlaze}, ${sizeLabel(chosenSize)}`}
                autoComplete="off"
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={stock}
                maxReason={`Only ${stock} in stock`}
                error={quantityError}
              />
              <p>
                Total for this quantity:{' '}
                <Numeral>{rupees.format(record.price * (quantity ?? 0))}</Numeral>
              </p>
            </>
          )}
          {notice ? (
            <Paragraph color="error" role="alert">
              {notice}
            </Paragraph>
          ) : null}
          <div className="flex-row-gap-2 flex-wrap items-center">
            <Button
              onClick={addToCart}
              disabledWithReason={soldOut ? 'This variant is sold out' : undefined}
            >
              Add to cart
            </Button>
            <Button
              // Reviewing the cart is the quiet step after adding.
              variant="base"
              as={NextLink}
              href="/cart"
            >
              Review cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
