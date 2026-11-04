import { ClientStatusOptions } from '@app/entities/enums';
import { Tag, type TagProps } from '@packages/ui/Tag';
import React from 'react';

const variantFor: Record<string, 'info' | 'success' | 'base'> = {
  lead: 'info',
  active: 'success',
  past: 'base',
};

/** A client's status as a tag, in its own color. */
export function ClientStatusTag({
  status,
  size,
}: {
  status: string;
  size?: TagProps['size'];
}) {
  const label = ClientStatusOptions.find((option) => option.key === status)?.label ?? status;
  return (
    <Tag
      size={size} // In tables the small tag fits the row; elsewhere the default applies.
      variant={variantFor[status] ?? 'base'} // Each client status keeps its own color.
    >
      {label}
    </Tag>
  );
}
