'use client';

import {
  emptyPieceValues,
  PieceForm,
} from '@app/blocks/PieceForm';
import { PageHeader } from '@app/components/PageHeader';
import { createPiece } from '@app/entities/piece';
import { toast } from '@packages/ui/Toast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import type { PieceInput } from '@app/entities/piece';

export default function AddPiecePage() {
  const router = useRouter();
  const [failures, setFailures] = useState(0);
  const serverError =
    failures > 0 ? 'Saving the piece failed and nothing was saved.' : undefined;

  const save = async (input: PieceInput) => {
    setFailures(0);
    try {
      await createPiece(input);
    } catch {
      setFailures((count) => count + 1);
      return;
    }
    toast({
      title: 'Piece saved',
      description: 'The new piece is now on sale.',
      status: 'success',
    });
    router.push('/studio/pieces');
  };

  const toastCancelled = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('a[href="/studio/pieces"]')) {
      toast({
        title: 'Nothing was saved',
        description: 'The piece list is unchanged.',
        status: 'info',
      });
    }
  };

  return (
    <>
      <PageHeader title="Add a piece" />
      <div className="flex-col-gap-4 items-start" onClickCapture={toastCancelled}>
        <PieceForm
          defaultValues={emptyPieceValues}
          submitLabel="Save"
          cancelHref="/studio/pieces"
          serverError={serverError}
          onSubmit={save}
        />
      </div>
    </>
  );
}
