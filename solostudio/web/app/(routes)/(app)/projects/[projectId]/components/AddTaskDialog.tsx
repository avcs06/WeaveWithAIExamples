'use client';

import { createTask } from '@app/entities/task';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import { emptyTaskForm, TaskForm, type TaskFormValues } from './TaskForm';

/** D10 Add a task: add a task to a project, standing out when overdue. */
export function AddTaskDialog({
  projectId,
  open,
  onOpenChange,
}: {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const formId = useId();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({ defaultValues: emptyTaskForm });
  const [saving, setSaving] = useState(false);

  const save = async (values: TaskFormValues) => {
    setSaving(true);
    try {
      await createTask({
        title: values.title.trim(),
        status: values.status || 'to_do',
        priority: values.priority || 'medium',
        dueDate: values.dueDate || undefined,
        project: projectId,
      });
      toast({ title: 'Task saved', status: 'success' });
      onOpenChange(false);
    } catch {
      setError('root.server', { message: 'Saving failed. Try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title="Add a task"
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <>
          <Button
            variant="base" // Cancel is the secondary action beside the main Save.
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={formId}
            loadingWithReason={saving || isSubmitting ? 'Saving the task' : undefined}
          >
            Save
          </Button>
        </>
      }
    >
      <TaskForm
        control={control}
        id={formId}
        onSubmit={(event) => {
          clearErrors('root');
          void handleSubmit(save)(event);
        }}
        error={errors.root?.server?.message}
      />
    </Dialog>
  );
}
