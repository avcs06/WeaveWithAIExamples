import type { ReactNode } from 'react';

export type PageLogoProps = {
  /** Where the logo links to. */
  href?: string;
  /** An icon before the name, such as the app's mark; it leads home with the name. */
  leftIcon?: ReactNode;
  /** An icon after the name; it leads home with the name. */
  rightIcon?: ReactNode;
};
