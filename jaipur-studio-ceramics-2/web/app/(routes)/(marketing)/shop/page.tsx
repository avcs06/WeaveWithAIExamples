'use client';

import { PieceCards } from '@app/blocks/pieces';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { PieceCategoryOptions } from '@app/entities/enums';
import { useListPieces } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Chip, ChipGroup } from '@packages/ui/Chip';
import { SearchInput } from '@packages/ui/Input';
import { Paragraph } from '@packages/ui/Typography';
import React, { useState } from 'react';

/** The full shop listing, with search and a category filter. */
export default function ShopPage() {
  const pieces = useListPieces();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const all = pieces.data ?? [];
  const query = search.trim().toLowerCase();
  const matching = all.filter(
    (piece) =>
      (category === 'all' || piece.category === category) &&
      (query === '' ||
        [piece.title, piece.description ?? ''].some((text) =>
          text.toLowerCase().includes(query),
        )),
  );

  if (pieces.loading || pieces.error) {
    return (
      <>
        <PageHeader
          title="Shop"
          description="Every piece made in our Jaipur studio, with honest availability."
        />
        <PageState
          loading={pieces.loading}
          loadingText="Loading the shop."
          errorText={
            pieces.error ? 'The shop could not be loaded.' : undefined
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
          title="Shop"
          description="Every piece made in our Jaipur studio, with honest availability."
        />
        <div className="flex-col-gap-3 items-start">
          <Paragraph role="status">
            No pieces are available right now. Please check back later.
          </Paragraph>
          <Button as={NextLink} href="/">
            Back to the studio page
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Shop"
        description="Every piece made in our Jaipur studio, with honest availability."
      />
      <div className="flex-row-gap-4 flex-wrap items-end" role="search">
        <SearchInput
          label="Search pieces"
          placeholder="Search pieces"
          value={search}
          onChange={setSearch}
        />
        <ChipGroup
          label="Category"
          value={category}
          onChange={(next) => next && setCategory(next)}
          className="flex-row-gap-2 flex-wrap"
        >
          <Chip value="all">All</Chip>
          {PieceCategoryOptions.map((option) => (
            <Chip key={option.key} value={option.key}>
              {option.label}
            </Chip>
          ))}
        </ChipGroup>
      </div>
      {matching.length === 0 ? (
        <div className="flex-col-gap-3 items-start">
          <Paragraph role="status">Nothing matches your search.</Paragraph>
          <Button
            // Clearing the search is secondary to browsing what is here.
            variant="base"
            onClick={() => {
              setSearch('');
              setCategory('all');
            }}
          >
            Clear search and category
          </Button>
        </div>
      ) : (
        <PieceCards pieces={matching} />
      )}
    </>
  );
}
