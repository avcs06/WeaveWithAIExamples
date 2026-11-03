import type { PageHeaderCrumb } from '@app/components/PageHeader';
import type { ReactNode } from 'react';

/** The screen's header above its loading or load-failed view. */
export type LoadingHeaderProps = {
  /** The page's title, shown in a PageHeader like every other screen. Omit it only when the page already shows its own header above. */
  title?: ReactNode;
  /** One muted line about the page. */
  description?: ReactNode;
  /** The pages above this one, from the top. */
  breadcrumb?: PageHeaderCrumb[];
};

export type LoadingViewProps = LoadingHeaderProps & {
  /** The loading sentence, such as "Loading the orders…". */
  message: ReactNode;
};

export type LoadFailedViewProps = LoadingViewProps & {
  /** Re-runs the failed load, such as the list hook's retry. */
  onRetry: () => void;
};
