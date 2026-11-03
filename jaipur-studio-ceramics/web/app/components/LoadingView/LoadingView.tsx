import { PageHeader } from '@app/components/PageHeader';
import { Button } from '@packages/ui/Button';
import { Paragraph } from '@packages/ui/Typography';
import React from 'react';

import type { LoadFailedViewProps, LoadingViewProps } from './LoadingView.types';

/**
 * The one loading view every screen shows while its records load: the
 * screen's PageHeader first, then its loading sentence.
 */
export const LoadingView = ({
  title,
  description,
  breadcrumb,
  message,
}: LoadingViewProps) => (
  <>
    {title ? (
      <PageHeader
        title={title}
        description={description}
        breadcrumb={breadcrumb}
      />
    ) : null}
    <Paragraph>{message}</Paragraph>
  </>
);

/**
 * The one load-failed view every screen shows when its records fail to
 * load: the screen's PageHeader first, then what failed and a Try-again
 * button.
 */
export const LoadFailedView = ({
  title,
  description,
  breadcrumb,
  message,
  onRetry,
}: LoadFailedViewProps) => (
  <>
    {title ? (
      <PageHeader
        title={title}
        description={description}
        breadcrumb={breadcrumb}
      />
    ) : null}
    <div className="flex-col-gap-4 items-start">
      <Paragraph>{message}</Paragraph>
      <Button onClick={onRetry}>Try again</Button>
    </div>
  </>
);
