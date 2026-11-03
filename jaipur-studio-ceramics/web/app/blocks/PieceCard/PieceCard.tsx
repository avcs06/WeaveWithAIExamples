'use client';

import { formatINR } from '@app/blocks/money';
import { availabilityLabel, pieceTotalStock } from '@app/blocks/stock';
import { NextLink } from '@app/components/NextLink';
import { CategoryOptions } from '@app/entities/enums';
import { CardList } from '@packages/ui/Card';
import { Image } from '@packages/ui/Image';
import { Numeral } from '@packages/ui/Numeral';
import { Caption, Paragraph } from '@packages/ui/Typography';
import React from 'react';

import type { Piece } from '@app/entities/piece';

const categoryLabel = (piece: Piece): string =>
  CategoryOptions.find((option) => option.key === piece.category)?.label ??
  piece.category;

/**
 * One piece's card content, for a CardList to draw around. The name opens
 * the piece, the price is a figure, and availability stays honest.
 */
const PieceCardContent = ({
  piece,
  href,
}: {
  piece: Piece;
  href: string;
}) => {
  const total = pieceTotalStock(piece);
  return (
    <>
      <Image
        src={piece.photos[0]}
        alt={`Photo of ${piece.name}`}
        width={400}
        height={300}
        fit="cover"
      />
      <h3>
        <NextLink look="plain" href={href}>
          {piece.name}
        </NextLink>
      </h3>
      <Caption>{categoryLabel(piece)}</Caption>
      <Paragraph>
        <Numeral>{formatINR(piece.price)}</Numeral>
        {' · '}
        {availabilityLabel(total)}
      </Paragraph>
    </>
  );
};

/**
 * Pieces browsed side by side, each opening its page from anywhere on its
 * card. Used by the landing page's featured pieces and the catalog.
 */
export const PieceCardGrid = ({
  pieces,
  hrefFor,
  label,
}: {
  pieces: Piece[];
  hrefFor: (piece: Piece) => string;
  label: string;
}) => (
  <CardList
    aria-label={label}
    items={pieces}
    // Grid suits pieces browsed side by side: photos compare better in rows.
    layout="grid"
    stretchLink
    renderItem={(piece) => (
      <PieceCardContent piece={piece} href={hrefFor(piece)} />
    )}
  />
);
