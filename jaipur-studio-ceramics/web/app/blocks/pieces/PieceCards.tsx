'use client';

import { NextLink } from '@app/components/NextLink';
import { PieceCategoryOptions } from '@app/entities/enums';
import { CardList } from '@packages/ui/Card';
import { Image } from '@packages/ui/Image';
import { Numeral } from '@packages/ui/Numeral';
import { Tag } from '@packages/ui/Tag';
import { Truncate } from '@packages/ui/Truncate';
import { Caption } from '@packages/ui/Typography';
import React from 'react';

import { rupees } from '../orders';

import { isSoldOut, pieceStockTotal } from './variants';

import type { Piece } from '@app/entities/piece';

const categoryLabel = (category: Piece['category']) =>
  PieceCategoryOptions.find((option) => option.key === category)?.label ??
  category;

/**
 * Pieces browsed side by side: a CardList grid where each card opens its
 * piece. Used by the landing page preview and the shop listing.
 */
export const PieceCards = ({ pieces }: { pieces: Piece[] }) => (
  <CardList
    aria-label="Pieces"
    items={pieces}
    // Records browsed side by side by photo, so they take a grid, not a column.
    layout="grid"
    stretchLink
    renderItem={(piece) => (
      <>
        <Image
          src={piece.photos[0]}
          alt={`Photo of ${piece.title}`}
          width={400}
          height={300}
          fit="cover"
        />
        <h3>
          <NextLink
            look="plain"
            href={`/shop/${piece.id}`}
            className="inline-block max-w-full"
          >
            <Truncate>{piece.title}</Truncate>
          </NextLink>
        </h3>
        <div className="flex-row-gap-2 items-center">
          <Tag
            // The extra-small tag keeps the category from outweighing the price.
            size="xs"
          >
            {categoryLabel(piece.category)}
          </Tag>
        </div>
        <p>
          <Numeral>{rupees.format(piece.price)}</Numeral>
        </p>
        <Caption>
          {isSoldOut(piece) ? 'Sold out' : `${pieceStockTotal(piece)} left`}
        </Caption>
      </>
    )}
  />
);
