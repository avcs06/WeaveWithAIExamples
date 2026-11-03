'use client';

// Loads its records through getPiece.
import { formatINR } from '@app/blocks/money';
import {
  isLowStock,
  isSoldOut,
  variantCombos,
} from '@app/blocks/stock';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { CategoryOptions } from '@app/entities/enums';
import { useListOrders } from '@app/entities/order';
import { useGetPiece } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Image } from '@packages/ui/Image';
import { Numeral } from '@packages/ui/Numeral';
import { Tag } from '@packages/ui/Tag';
import {
  Caption,
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  List,
  ListItem,
  Paragraph,
} from '@packages/ui/Typography';
import React, { useState } from 'react';

import { RemovePieceDialog } from './components/RemovePieceDialog';

export default function PiecePage({
  params,
}: {
  params: Promise<{ pieceId: string }>;
}) {
  const { pieceId } = React.use(params);
  const { data: piece, loading, error, retry } = useGetPiece(pieceId);
  const { data: orders } = useListOrders();
  const [removeOpen, setRemoveOpen] = useState(false);

  const blockingOrders =
    piece == null
      ? []
      : (orders ?? []).filter(
          (order) =>
            (order.fulfilmentStatus === 'new' ||
              order.fulfilmentStatus === 'packed') &&
            order.pieces.includes(piece.id),
        );

  if (loading) {
    return (
      <LoadingView
        title="Piece"
        breadcrumb={[{ label: 'Pieces', href: '/studio/pieces' }]}
        message="Loading the piece…"
      />
    );
  }

  if (error) {
    return (
      <LoadFailedView
        title="Piece"
        breadcrumb={[{ label: 'Pieces', href: '/studio/pieces' }]}
        message="Something went wrong while loading the piece."
        onRetry={retry}
      />
    );
  }

  if (!piece) {
    return (
      <NotFound
        title="This piece is gone."
        description="It may have been removed, or the link is wrong."
        back={{ label: 'Pieces', href: '/studio/pieces' }}
      />
    );
  }

  const category =
    CategoryOptions.find((option) => option.key === piece.category)?.label ??
    piece.category;

  return (
    <>
      <PageHeader
        title={piece.name}
        breadcrumb={[{ label: 'Pieces', href: '/studio/pieces' }]}
      />
      <div className="flex-col-gap-4 items-start">
        <div className="flex-row-gap-3 flex-wrap">
          {piece.photos.map((photo, at) => (
            <Image
              key={`${photo}-${at}`}
              src={photo}
              alt={at === 0 ? piece.name : `${piece.name}, photo ${at + 1}`}
              width={400}
              height={300}
              fit="cover"
            />
          ))}
        </div>
        {piece.description ? (
          <Paragraph>{piece.description}</Paragraph>
        ) : null}
        <DescriptionList>
          <div>
            <DescriptionTerm>Price</DescriptionTerm>
            <DescriptionDetails>
              <Numeral>{formatINR(piece.price)}</Numeral>
            </DescriptionDetails>
          </div>
          <div>
            <DescriptionTerm>Category</DescriptionTerm>
            <DescriptionDetails>{category}</DescriptionDetails>
          </div>
        </DescriptionList>
        <div className="flex-col-gap-2 items-start">
          <Caption>Stock by variant</Caption>
          <List>
            {variantCombos(piece).map((combo) => (
              <ListItem key={`${combo.glazeIndex}:${combo.sizeIndex}`}>
                {combo.glaze} · {combo.size}: {combo.stock} left{' '}
                {isSoldOut(combo.stock) ? (
                  <Tag
                    size="xs" // Fits the dense variant line.
                    variant="error" // Sold out reads as a stop, not a warning.
                  >
                    Sold out
                  </Tag>
                ) : isLowStock(combo.stock) ? (
                  <Tag
                    size="xs" // Fits the dense variant line.
                    variant="warning" // Low stock asks for a new batch soon.
                  >
                    Low stock
                  </Tag>
                ) : null}
              </ListItem>
            ))}
          </List>
        </div>
        <Button as={NextLink} href={`/studio/pieces/${piece.id}/edit`}>
          Edit piece
        </Button>
        <Button
          variant="base" // Removing is quiet beside the main edit action.
          look="ghost" // Sits in the page without drawing the eye from Edit piece.
          onClick={() => setRemoveOpen(true)}
        >
          Remove piece
        </Button>
        <NextLink look="plain" href="/studio/pieces">
          Pieces
        </NextLink>
      </div>
      <RemovePieceDialog
        open={removeOpen}
        piece={piece ?? null}
        blockingOrders={blockingOrders}
        onOpenChange={setRemoveOpen}
      />
    </>
  );
}
