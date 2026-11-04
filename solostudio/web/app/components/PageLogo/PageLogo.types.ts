import type { ReactNode } from 'react';

export type PageLogoProps = {
  /** An icon before the name, such as the app's mark; it leads home with the name. */
  leftIcon?: ReactNode;
  /** An icon after the name; it leads home with the name. */
  rightIcon?: ReactNode;
  /** Where the logo leads: the site root, or the workspace home inside the app frame. */
  href?: string;
};
