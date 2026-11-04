'use client';

import { deleteDashboard } from '@app/entities/dashboard';
import { deleteWidgetsByDashboard } from '@app/entities/widget';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import React, { useState } from 'react';

export function DeleteDashboardDialog({
  dashboardId,
  dashboardName,
  open,
  onOpenChange,
  onDeleted,
}: {
  dashboardId: string;
  dashboardName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    setError(undefined);
    try {
      await deleteDashboard(dashboardId);
      await deleteWidgetsByDashboard(dashboardId);
      toast({ title: 'Dashboard deleted' });
      onOpenChange(false);
      onDeleted();
    } catch (e: unknown) {
      const msg = (e as Error).message;
      if (msg.includes('not found') || msg.includes('already gone')) {
        setError('This dashboard is already gone.');
      } else {
        setError('Could not delete. Try again.');
      }
    } finally {
      setDeleting(false);
    }
  };

  const isAlreadyGone = error === 'This dashboard is already gone.';

  return (
    <Dialog
      title={isAlreadyGone ? 'This dashboard is already gone.' : 'Delete this dashboard?'}
      open={open}
      onOpenChange={onOpenChange}
      footer={(close) => (
        <>
          {isAlreadyGone ? (
            <Button onClick={() => { onOpenChange(false); onDeleted(); }}>Close</Button>
          ) : (
            <>
              <Button onClick={() => close()}>Cancel</Button>
              <Button
                // destructive confirm for permanent delete
                variant="danger"
                loadingWithReason={deleting ? 'Deleting dashboard' : undefined}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
        </>
      )}
    >
      {isAlreadyGone ? null : <p>This will permanently delete the dashboard and all its widgets. This cannot be undone.</p>}
      {error && !isAlreadyGone ? <p role="alert">{error}</p> : null}
    </Dialog>
  );
}
