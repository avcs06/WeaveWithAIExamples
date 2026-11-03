'use client';

// Loads its records through listPieces.
import { formatINR } from '@app/blocks/money';
import { isLowStock, isSoldOut, variantCombos } from '@app/blocks/stock';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { useListPieces } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Image } from '@packages/ui/Image';
import { SearchInput } from '@packages/ui/Input';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { Paragraph } from '@packages/ui/Typography';
import React, { useState } from 'react';

type PieceRow = {
  key: string;
  id: string;
  name: string;
  photo: string;
  price: number;
  stockLines: { key: string; text: string; stock: number }[];
};

const PieceTable = createTable<PieceRow>();

export default function PiecesPage() {
  const { data: pieces, loading, error, retry } = useListPieces();
  const [search, setSearch] = useState('');

  if (loading) {
    return <LoadingView title="Pieces" message="Loading the pieces…" />;
  }

  if (error) {
    return (
      <LoadFailedView
        title="Pieces"
        message="Something went wrong while loading the pieces."
        onRetry={retry}
      />
    );
  }

  const all = [...(pieces ?? [])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  if (all.length === 0) {
    return (
      <>
        <PageHeader title="Pieces" />
        <div className="flex-col-gap-4 items-start">
          <Paragraph>No pieces yet. Add the first piece to start selling.</Paragraph>
          <Button as={NextLink} href="/studio/pieces/new">
            Add a piece
          </Button>
        </div>
      </>
    );
  }

  const query = search.trim().toLowerCase();
  const matching = all.filter(
    (piece) =>
      query === '' ||
      piece.name.toLowerCase().includes(query) ||
      piece.glaze.some((glaze) => glaze.toLowerCase().includes(query)),
  );

  return (
    <>
      <PageHeader
        title="Pieces"
        actions={
          // Hidden while nothing matches, so the add action appears only once in the empty state.
          matching.length === 0 ? undefined : (
            <Button as={NextLink} href="/studio/pieces/new">
              Add a piece
            </Button>
          )
        }
      />
      <div className="flex-col-gap-4 items-start">
        <div role="search">
          <SearchInput
            label="Search pieces"
            placeholder="Name or glaze"
            value={search}
            onChange={setSearch}
          />
        </div>
        {matching.length === 0 ? (
          <div className="flex-col-gap-4 items-start">
            <Paragraph>Nothing matches your search.</Paragraph>
            <div className="flex-row-gap-2 flex-wrap">
              <Button
                variant="base" // Quiet way back to the full list.
                onClick={() => setSearch('')}
              >
                Clear search
              </Button>
              <Button as={NextLink} href="/studio/pieces/new">
                Add a piece
              </Button>
            </div>
          </div>
        ) : (
          <PieceTable
            caption="Pieces"
            data={matching.map((piece) => ({
              key: piece.id,
              id: piece.id,
              name: piece.name,
              photo: piece.photos[0] ?? '',
              price: piece.price,
              stockLines: variantCombos(piece).map((combo) => ({
                key: `${combo.glazeIndex}:${combo.sizeIndex}`,
                text: `${combo.glaze} · ${combo.size}: ${combo.stock} left`,
                stock: combo.stock,
              })),
            }))}
            rowKey={(row) => row.key}
            onRowClick={(_, click) =>
              click.currentTarget.querySelector('a')?.click()
            }
          >
            <PieceTable.Column
              id="photo"
              title={<span className="sr-only">Photo</span>}
              dataKey="photo"
              width={88}
            >
              {(photo, row) => (
                <Image
                  src={photo || undefined}
                  alt={row.name}
                  width={64}
                  height={48}
                  fit="cover"
                />
              )}
            </PieceTable.Column>
            <PieceTable.Column
              id="name"
              rowHeader
              title="Name"
              dataKey="name"
              width={240}
            >
              {(name, row) => (
                <NextLink href={`/studio/pieces/${row.id}`}>{name}</NextLink>
              )}
            </PieceTable.Column>
            <PieceTable.Column
              id="price"
              title="Price"
              dataKey="price"
              width={120}
              align="right"
            >
              {(price) => <Numeral>{formatINR(price)}</Numeral>}
            </PieceTable.Column>
            <PieceTable.Column
              id="stock"
              title="Stock"
              dataKey="name"
              width={280}
            >
              {(_, row) => (
                <span className="flex-col-gap-1 items-start">
                  {row.stockLines.map((line) => (
                    <span
                      key={line.key}
                      className="flex-row-gap-2 flex-wrap items-center"
                    >
                      {line.text}
                      {isSoldOut(line.stock) ? (
                        <Tag
                          size="xs" // Fits the dense table row.
                          variant="error" // Sold out reads as a stop, not a warning.
                        >
                          Sold out
                        </Tag>
                      ) : isLowStock(line.stock) ? (
                        <Tag
                          size="xs" // Fits the dense table row.
                          variant="warning" // Low stock asks for a new batch soon.
                        >
                          Low stock
                        </Tag>
                      ) : null}
                    </span>
                  ))}
                </span>
              )}
            </PieceTable.Column>
          </PieceTable>
        )}
      </div>
    </>
  );
}
