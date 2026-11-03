'use client';

// Loads its records through getPiece.
import {
  PieceForm,
  pieceToValues,
} from '@app/blocks/PieceForm';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { updatePiece, useGetPiece } from '@app/entities/piece';
import { toast } from '@packages/ui/Toast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import type { PieceInput } from '@app/entities/piece';

export default function EditPiecePage({
  params,
}: {
  params: Promise<{ pieceId: string }>;
}) {
  const { pieceId } = React.use(params);
  const { data: piece, loading, error, retry } = useGetPiece(pieceId);
  const router = useRouter();
  const [failures, setFailures] = useState(0);
  const serverError =
    failures > 0 ? 'Saving the changes failed and nothing was changed.' : undefined;

  if (loading) {
    return (
      <LoadingView
        title="Edit piece"
        breadcrumb={[{ label: 'Pieces', href: '/studio/pieces' }]}
        message="Loading the piece…"
      />
    );
  }

  if (error) {
    return (
      <LoadFailedView
        title="Edit piece"
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

  const save = async (input: PieceInput) => {
    setFailures(0);
    try {
      await updatePiece(piece.id, input);
    } catch {
      setFailures((count) => count + 1);
      return;
    }
    toast({
      title: 'Piece saved',
      description: 'The piece shows its new details.',
      status: 'success',
    });
    router.push(`/studio/pieces/${piece.id}`);
  };

  const toastCancelled = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(`a[href="/studio/pieces/${piece.id}"]`)) {
      toast({
        title: 'Nothing was changed',
        description: 'The piece is as it was.',
        status: 'info',
      });
    }
  };

  return (
    <>
      <PageHeader
        title={`Edit ${piece.name}`}
        breadcrumb={[{ label: 'Pieces', href: '/studio/pieces' }]}
      />
      <div className="flex-col-gap-4 items-start" onClickCapture={toastCancelled}>
        <PieceForm
          key={piece.id}
          defaultValues={pieceToValues(piece)}
          submitLabel="Save"
          cancelHref={`/studio/pieces/${piece.id}`}
          serverError={serverError}
          onSubmit={save}
        />
        <NextLink look="plain" href="/studio/pieces">
          Pieces
        </NextLink>
      </div>
    </>
  );
}
