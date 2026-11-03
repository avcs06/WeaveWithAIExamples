'use client';

import {
  PieceForm,
  type PieceFormValues,
} from '@app/blocks/PieceForm';
import { pieceVariants } from '@app/blocks/pieces';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { updatePiece, useGetPiece } from '@app/entities/piece';
import { toast } from '@packages/ui/Toast';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

/** Edit a piece's details, variants or stock quantities. */
export default function EditPiecePage() {
  const { pieceId } = useParams<{ pieceId: string }>();
  const router = useRouter();
  const piece = useGetPiece(pieceId);

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

  const defaults: PieceFormValues = {
    title: record.title,
    description: record.description ?? '',
    price: record.price,
    photos: record.photos.map((url) => ({ url })),
    category: record.category,
    variants: pieceVariants(record).map((variant) => ({
      glaze: variant.glaze,
      size: variant.size,
      stockQuantity: variant.stock,
    })),
  };

  const save = async (values: PieceFormValues) => {
    await updatePiece(record.id, {
      title: values.title.trim(),
      description: values.description.trim() || undefined,
      price: values.price ?? record.price,
      photos: values.photos.map((photo) => photo.url.trim()),
      category: values.category as 'mug' | 'bowl' | 'planter' | 'vase',
      glaze: values.variants.map((variant) => variant.glaze.trim()),
      size: values.variants.map(
        (variant) => variant.size as 'small' | 'medium' | 'large',
      ),
      stockQuantity: values.variants.map(
        (variant) => variant.stockQuantity ?? 0,
      ),
    });
    toast({ title: 'Piece saved', status: 'success' });
    router.push(`/dashboard/pieces/${record.id}`);
  };

  return (
    <>
      <PageHeader
        title={`Edit ${record.title}`}
        breadcrumb={[
          { label: 'Pieces', href: '/dashboard/pieces' },
          { label: record.title, href: `/dashboard/pieces/${record.id}` },
        ]}
      />
      <PieceForm
        key={record.id}
        defaultValues={defaults}
        submitLabel="Save piece"
        savingLabel="Saving the piece"
        cancelHref={`/dashboard/pieces/${record.id}`}
        failureMessage="The changes could not be saved. Try again."
        onSubmit={save}
      />
    </>
  );
}
