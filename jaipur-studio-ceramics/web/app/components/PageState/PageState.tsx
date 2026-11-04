'use client';

import { Button } from '@packages/ui/Button';
import { Paragraph } from '@packages/ui/Typography';
import React from 'react';

/**
 * The loading and failed-load states, the same on every screen: a status
 * while records load, and an error with a retry when loading fails.
 */
export const PageState = ({
  loading = false,
  loadingText,
  errorText,
  onRetry,
}: {
  loading?: boolean;
  loadingText?: string;
  errorText?: string;
  onRetry?: () => void;
}) => {
  if (loading) {
    return (
      <Paragraph color="muted" role="status">
        {loadingText}
      </Paragraph>
    );
  }
  if (errorText && onRetry) {
    return (
      <div className="flex-col-gap-2 items-start">
        <Paragraph color="error" role="alert">
          {errorText}
        </Paragraph>
        <Button
          // Retry is the quiet way back after a failed load.
          variant="base"
          onClick={onRetry}
        >
          Try again
        </Button>
      </div>
    );
  }
  return null;
};
