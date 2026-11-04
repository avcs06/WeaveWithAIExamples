'use client';

import { rupees } from '@app/blocks/orders';
import { pieceStockTotal, pieceVariants, sizeLabel } from '@app/blocks/pieces';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { PieceCategoryOptions } from '@app/entities/enums';
import { useListPieces, type Piece } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Chip, ChipGroup } from '@packages/ui/Chip';
import { Image } from '@packages/ui/Image';
import { SearchInput } from '@packages/ui/Input';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { Truncate } from '@packages/ui/Truncate';
import { Caption, Paragraph } from '@packages/ui/Typography';
import React, { useState } from 'react';

const PiecesTable = createTable<Piece>();

type Availability = 'all' | 'in' | 'low' | 'soldout';

const availabilityOf = (piece: Piece): Availability => {
  if (pieceStockTotal(piece) <= 0) return 'soldout';
  if (pieceVariants(piece).some((variant) => variant.stock <= 3)) return 'low';
  return 'in';
};

const categoryLabel = (category: Piece['category']) =>
  PieceCategoryOptions.find((option) => option.key === category)?.label ??
  category;

/** Pieces: search, filter by availability, and spot what is nearly gone. */
export default function PiecesPage() {
  const pieces = useListPieces();
  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState('all');

  const all = pieces.data ?? [];
  const query = search.trim().toLowerCase();
  const matching = all.filter(
    (piece) =>
      (availability === 'all' || availabilityOf(piece) === availability) &&
      (query === '' ||
        [piece.title, piece.description ?? ''].some((text) =>
          text.toLowerCase().includes(query),
        )),
  );

  if (pieces.loading || pieces.error) {
    return (
      <>
        <PageHeader
          title="Pieces"
          description="Every piece in the shop, with each glaze and size and what is left."
        />
        <PageState
          loading={pieces.loading}
          loadingText="Loading the pieces."
          errorText={
            pieces.error ? 'The pieces could not be loaded.' : undefined
          }
          onRetry={pieces.retry}
        />
      </>
    );
  }

  if (all.length === 0) {
    return (
      <>
        <PageHeader
          title="Pieces"
          description="Every piece in the shop, with each glaze and size and what is left."
        />
        <div className="flex-col-gap-3 items-start">
          <Paragraph role="status">
            No pieces yet. Add the first piece to start your shop.
          </Paragraph>
          <Button as={NextLink} href="/dashboard/pieces/new">
            Add a piece
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Pieces"
        description="Every piece in the shop, with each glaze and size and what is left."
        actions={
          <Button as={NextLink} href="/dashboard/pieces/new">
            Add a piece
          </Button>
        }
      />
      <div className="flex-row-gap-4 flex-wrap items-end" role="search">
        <SearchInput
          label="Search pieces"
          placeholder="Search pieces"
          value={search}
          onChange={setSearch}
        />
        <ChipGroup
          label="Availability"
          value={availability}
          onChange={(next) => next && setAvailability(next)}
          className="flex-row-gap-2 flex-wrap"
        >
          <Chip value="all">All</Chip>
          <Chip value="in">In stock</Chip>
          <Chip value="low">Low stock</Chip>
          <Chip value="soldout">Sold out</Chip>
        </ChipGroup>
      </div>
      {matching.length === 0 ? (
            <div className="flex-col-gap-3 items-start">
              <Paragraph role="status">
                Nothing matches your search or filter.
              </Paragraph>
              <Button
                // Clearing the search is secondary to browsing what is here.
                variant="base"
                onClick={() => {
                  setSearch('');
                  setAvailability('all');
                }}
              >
                Clear search and filter
              </Button>
            </div>
          ) : (
            <PiecesTable
              caption="Pieces"
              data={matching}
              rowKey={(piece) => piece.id}
              onRowClick={(_, click) =>
                click.currentTarget.querySelector('a')?.click()
              }
            >
              <PiecesTable.Column
                id="photo"
                title={<span className="sr-only">Photo</span>}
                dataKey="id"
                width={96}
              >
                {(id, piece) => (
                  <Image
                    src={piece.photos[0]}
                    alt=""
                    width={72}
                    height={72}
                    fit="cover"
                  />
                )}
              </PiecesTable.Column>
              <PiecesTable.Column
                id="title"
                rowHeader
                title="Piece"
                dataKey="title"
                width={240}
              >
                {(title, piece) => (
                  <NextLink
                    href={`/dashboard/pieces/${piece.id}`}
                    className="inline-block max-w-full"
                  >
                    <Truncate>{title}</Truncate>
                  </NextLink>
                )}
              </PiecesTable.Column>
              <PiecesTable.Column
                id="category"
                title="Category"
                dataKey="category"
                width={120}
              >
                {(category: Piece['category']) => categoryLabel(category)}
              </PiecesTable.Column>
              <PiecesTable.Column
                id="price"
                title="Price"
                dataKey="price"
                width={120}
                align="right"
              >
                {(price) => <Numeral>{rupees.format(price)}</Numeral>}
              </PiecesTable.Column>
              <PiecesTable.Column
                id="variants"
                title="Variants"
                dataKey="id"
                width={320}
              >
                {(_, piece) => (
                  <div className="flex-col-gap-1">
                    {pieceVariants(piece).map((variant) => (
                      <Caption key={variant.index}>
                        {variant.glaze} · {sizeLabel(variant.size)} · {variant.stock} left
                        {variant.stock <= 0 ? (
                          <>
                            {' '}
                            <Tag
                              // Sold out decides the next batch, so it reads as an error.
                              variant="error"
                            >
                              Sold out
                            </Tag>
                          </>
                        ) : variant.stock <= 3 ? (
                          <>
                            {' '}
                            <Tag
                              // Three or fewer left is the owner's restock signal.
                              variant="warning"
                            >
                              Low stock
                            </Tag>
                          </>
                        ) : null}
                      </Caption>
                    ))}
                  </div>
                )}
              </PiecesTable.Column>
            </PiecesTable>
          )}
    </>
  );
}
