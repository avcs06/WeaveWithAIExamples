'use client';

import { rupees } from '@app/blocks/orders';
import { pieceStockTotal, pieceVariants, sizeLabel } from '@app/blocks/pieces';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { PieceCategoryOptions } from '@app/entities/enums';
import { deletePiece, useGetPiece } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import {
  DialogResult,
  openConfirmationDialog,
} from '@packages/ui/Dialog';
import { Image } from '@packages/ui/Image';
import { Numeral } from '@packages/ui/Numeral';
import { Tag } from '@packages/ui/Tag';
import { toast } from '@packages/ui/Toast';
import { Paragraph } from '@packages/ui/Typography';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

/** One piece: its details, variants and stock, then edit or remove it. */
export default function PieceDetailPage() {
  const { pieceId } = useParams<{ pieceId: string }>();
  const router = useRouter();
  const piece = useGetPiece(pieceId);
  const [removing, setRemoving] = useState(false);

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
        back={{ label: 'Back to pieces', href: '/dashboard/pieces' }}
      />
    );
  }

  const category =
    PieceCategoryOptions.find((option) => option.key === record.category)
      ?.label ?? record.category;

  const remove = async () => {
    if (removing) return;
    const result = await openConfirmationDialog({
      title: 'Remove this piece?',
      content:
        'Removing the piece removes it from the shop, while past orders keep their snapshot of it.',
      // Removing cannot be undone, so the confirm reads as danger.
      status: 'error',
      footer: (closeDialog) => (
        <>
          <Button
            // Keeping the piece is the quiet way out of the confirm.
            variant="base"
            onClick={() => closeDialog(DialogResult.cancel)}
          >
            Cancel
          </Button>
          <Button
            // Deleting is the confirm's filled danger button.
            variant="danger"
            onClick={() => closeDialog(DialogResult.confirm)}
          >
            Delete
          </Button>
        </>
      ),
    });
    if (result !== DialogResult.confirm) return;
    setRemoving(true);
    try {
      await deletePiece(record.id);
      toast({ title: 'Piece removed', status: 'success' });
      router.push('/dashboard/pieces');
    } catch {
      toast({
        title: 'The piece could not be removed',
        description: 'Try again.',
        status: 'error',
      });
    } finally {
      setRemoving(false);
    }
  };

  return (
    <>
      <PageHeader
        title={record.title}
        description={`${category} · ${pieceStockTotal(record)} left in total.`}
        breadcrumb={[{ label: 'Pieces', href: '/dashboard/pieces' }]}
        actions={
          <>
            <Button as={NextLink} href={`/dashboard/pieces/${record.id}/edit`}>
              Edit piece
            </Button>
            <Button
              // Removing ends the piece's sale, so it reads as danger.
              variant="danger"
              loadingWithReason={removing ? 'Removing the piece' : undefined}
              onClick={remove}
            >
              Remove piece
            </Button>
          </>
        }
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
          {record.description ? (
            <Paragraph>{record.description}</Paragraph>
          ) : null}
          <p className="text-heading">
            <Numeral>{rupees.format(record.price)}</Numeral>
          </p>
          <div className="flex-col-gap-2">
            {pieceVariants(record).map((variant) => (
              <div
                key={variant.index}
                className="flex-row-gap-2 items-center"
              >
                <Paragraph>
                  {variant.glaze} · {sizeLabel(variant.size)} ·{' '}
                  <Numeral>{variant.stock}</Numeral> left
                </Paragraph>
                {variant.stock <= 0 ? (
                  <Tag
                    // Sold out decides the next batch, so it reads as an error.
                    variant="error"
                  >
                    Sold out
                  </Tag>
                ) : variant.stock <= 3 ? (
                  <Tag
                    // Three or fewer left is the owner's restock signal.
                    variant="warning"
                  >
                    Low stock
                  </Tag>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
