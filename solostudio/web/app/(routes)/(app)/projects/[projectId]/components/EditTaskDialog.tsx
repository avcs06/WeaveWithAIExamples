'use client';

import { updateTask, useGetTask, type Task } from '@app/entities/task';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import { Paragraph } from '@packages/ui/Typography';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import { TaskForm, type TaskFormValues } from './TaskForm';

/** D11 Edit task: change a task's title, status, priority or due date. */
export function EditTaskDialog({
  task,
  onOpenChange,
}: {
  task: Task;
  onOpenChange: (open: boolean) => void;
}) {
  const formId = useId();
  const current = useGetTask(task.id);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: task.title,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ?? '',
    },
  });
  const [saving, setSaving] = useState(false);

  if (!current.data && !current.loading) {
    return (
      <Dialog
        title={`Edit ${task.title}`}
        open
        onOpenChange={onOpenChange}
        footer={
          <Button
            variant="base" // Cancel is the only way out once the task is gone.
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        }
      >
        <Paragraph>That task is gone.</Paragraph>
      </Dialog>
    );
  }

  const save = async (values: TaskFormValues) => {
    setSaving(true);
    try {
      await updateTask(task.id, {
        title: values.title.trim(),
        status: values.status || task.status,
        priority: values.priority || task.priority,
        dueDate: values.dueDate || undefined,
      });
      toast({ title: 'Task updated', status: 'success' });
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        setError('root.server', { message: 'That task is gone.' });
      } else {
        setError('root.server', { message: 'Saving failed. Try again.' });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title={`Edit ${task.title}`}
      open
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
