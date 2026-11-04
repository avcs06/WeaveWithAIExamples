import { TaskPriorityOptions, TaskStatusOptions } from '@app/entities/enums';
import { Tag } from '@packages/ui/Tag';
import React from 'react';

const statusVariantFor: Record<string, 'base' | 'info' | 'success'> = {
  to_do: 'base',
  in_progress: 'info',
  done: 'success',
};

/** A task's status as a tag, in its own color. */
export function TaskStatusTag({ status }: { status: string }) {
  const label = TaskStatusOptions.find((option) => option.key === status)?.label ?? status;
  return (
    <Tag
      variant={statusVariantFor[status] ?? 'base'} // Each task status keeps its own color.
    >
      {label}
    </Tag>
  );
}

const priorityVariantFor: Record<string, 'base' | 'warning' | 'error'> = {
  low: 'base',
  medium: 'warning',
  high: 'error',
};

/** A task's priority as a tag, in its own color. */
export function TaskPriorityTag({ priority }: { priority: string }) {
  const label = TaskPriorityOptions.find((option) => option.key === priority)?.label ?? priority;
  return (
    <Tag
      variant={priorityVariantFor[priority] ?? 'base'} // Each priority keeps its own color.
    >
      {label}
    </Tag>
  );
}
