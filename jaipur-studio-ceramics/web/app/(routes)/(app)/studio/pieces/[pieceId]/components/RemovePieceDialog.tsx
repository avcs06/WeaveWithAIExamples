'use client';

import { deletePiece } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { Paragraph } from '@packages/ui/Typography';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import type { Order } from '@app/entities/order';
import type { Piece } from '@app/entities/piece';

/**
 * Confirm removing a piece: the screen loads the piece and its blocking
 * orders through its hooks and passes them in, so the dialog never loads
 * records itself.
 */
export const RemovePieceDialog = ({
  open,
  piece,
  blockingOrders,
  onOpenChange,
}: {
  open: boolean;
  piece: Piece | null;
  blockingOrders: Order[];
  onOpenChange: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [failed, setFailed] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const close = () => {
    setFailed(false);
    onOpenChange(false);
  };

  const remove = async () => {
    if (!piece) return;
    setFailed(false);
    setDeleting(true);
    try {
      await deletePiece(piece.id);
      router.push('/studio/pieces');
    } catch {
      setFailed(true);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
      title="Remove this piece?"
      footer={
        !piece || blockingOrders.length > 0 ? (
          <Button
            variant="base" // The only way out when nothing can be removed.
            onClick={close}
          >
            Cancel
          </Button>
        ) : (
          <>
            <Button
              variant="base" // Quiet way out beside the destructive confirm.
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              variant="danger" // Deleting cannot be undone, so the confirm stands out.
              loadingWithReason={deleting ? 'Removing the piece' : undefined}
              onClick={remove}
            >
              Delete
            </Button>
          </>
        )
      }
    >
      <div className="flex-col-gap-2">
        {!piece ? (
          <Paragraph>This piece is already gone.</Paragraph>
        ) : blockingOrders.length > 0 ? (
          <Paragraph>
            This piece cannot be removed while it is in a New or Packed order.
            Existing orders keep their item snapshot.
          </Paragraph>
        ) : (
          <>
            <Paragraph>
              Removing the piece takes it off the shop. Existing orders keep
              their item snapshot.
            </Paragraph>
            {failed ? (
              <Paragraph>
                Removing the piece failed. Try deleting it again.
              </Paragraph>
            ) : null}
          </>
        )}
      </div>
    </Dialog>
  );
};
