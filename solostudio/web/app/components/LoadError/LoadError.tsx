import { Button } from '@packages/ui/Button';
import { Paragraph } from '@packages/ui/Typography';
import React from 'react';

/** A failed load with a retry, the same on every screen. */
export function LoadError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="flex-row-gap-3 items-center">
      <Paragraph>{message}</Paragraph>
      <Button
        variant="base" // The quiet way out beside the error message, not the page's main action.
        onClick={onRetry}
      >
        Retry
      </Button>
    </div>
  );
}
