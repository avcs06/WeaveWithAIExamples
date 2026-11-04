'use client';

import {
  PieceForm,
  emptyPieceForm,
  type PieceFormValues,
} from '@app/blocks/PieceForm';
import { PageHeader } from '@app/components/PageHeader';
import { createPiece } from '@app/entities/piece';
import { toast } from '@packages/ui/Toast';
import { useRouter } from 'next/navigation';
import React from 'react';

/** Add a new ceramic piece with photos, variants and stock. */
export default function NewPiecePage() {
  const router = useRouter();

  const save = async (values: PieceFormValues) => {
    await createPiece({
      title: values.title.trim(),
      description: values.description.trim() || undefined,
      price: values.price ?? 1,
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
    router.push('/dashboard/pieces');
  };

  return (
    <>
      <PageHeader
        title="Add a piece"
        description="A new piece for the shop, with its photos, variants and stock."
        breadcrumb={[{ label: 'Pieces', href: '/dashboard/pieces' }]}
      />
      <PieceForm
        defaultValues={emptyPieceForm}
        submitLabel="Save piece"
        savingLabel="Saving the piece"
        cancelHref="/dashboard/pieces"
        failureMessage="The piece could not be saved. Try again."
        onSubmit={save}
      />
    </>
  );
}
