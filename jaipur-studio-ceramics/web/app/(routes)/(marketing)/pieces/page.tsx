'use client';

// Loads its records through listPieces.
import { PieceCardGrid } from '@app/blocks/PieceCard';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { CategoryOptions } from '@app/entities/enums';
import { useListPieces } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { SearchInput } from '@packages/ui/Input';
import { Select, SelectOption } from '@packages/ui/Select';
import { Paragraph } from '@packages/ui/Typography';
import React, { useState } from 'react';

const ALL = 'all';

const categoryLabel = (key: string): string =>
  CategoryOptions.find((option) => option.key === key)?.label ?? key;

export default function BrowsePiecesPage() {
  const { data: pieces, loading, error, retry } = useListPieces();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>(ALL);

  const all = pieces ?? [];
  const words = search.toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = all.filter((piece) => {
    if (category !== ALL && piece.category !== category) return false;
    if (words.length === 0) return true;
    const haystack =
      `${piece.name} ${piece.description ?? ''} ${categoryLabel(piece.category)}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });

  return (
    <>
      <PageHeader title="Browse pieces" />
      <div className="flex-row-gap-4 flex-wrap items-end">
        <div role="search">
          <SearchInput
            label="Search pieces"
            placeholder="Search pieces"
            value={search}
            onChange={setSearch}
          />
        </div>
        <Select
          label="Category"
          allowSearch={false}
          allowClear={false}
          value={category}
          onChange={(next) => next && setCategory(next)}
        >
          <SelectOption value={ALL} label="All" />
          {CategoryOptions.map((option) => (
            <SelectOption
              key={option.key}
              value={option.key}
              label={option.label}
            />
          ))}
        </Select>
      </div>
      {loading ? <LoadingView message="Loading pieces…" /> : null}
      {!loading && error ? (
        <LoadFailedView
          message="Something went wrong while loading the pieces."
          onRetry={retry}
        />
      ) : null}
      {!loading && !error && all.length === 0 ? (
        <div className="flex-col-gap-4 items-start">
          <Paragraph>
            No pieces are available right now. The studio is preparing the
            next batch.
          </Paragraph>
          <Button as={NextLink} href="/">
            Back to the shop
          </Button>
        </div>
      ) : null}
      {!loading && !error && all.length > 0 && filtered.length === 0 ? (
        <div className="flex-col-gap-4 items-start">
          <Paragraph>Nothing matches your search.</Paragraph>
          <Button
            variant="base" // Clearing the filters is the quiet way back to the full list.
            onClick={() => {
              setSearch('');
              setCategory(ALL);
            }}
          >
            Clear search and category
          </Button>
        </div>
      ) : null}
      {!loading && !error && filtered.length > 0 ? (
        <PieceCardGrid
          pieces={filtered}
          hrefFor={(piece) => `/pieces/${piece.id}`}
          label="Pieces"
        />
      ) : null}
    </>
  );
}
