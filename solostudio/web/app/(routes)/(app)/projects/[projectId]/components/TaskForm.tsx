'use client';

import { TaskPriorityOptions, TaskStatusOptions, type TaskPriority, type TaskStatus } from '@app/entities/enums';
import { Controller, Form } from '@packages/ui/Form';
import { DateInput, Input } from '@packages/ui/Input';
import { Select, SelectOption } from '@packages/ui/Select';
import React from 'react';
import { type Control } from 'react-hook-form';

export type TaskFormValues = {
  title: string;
  status: TaskStatus | '';
  priority: TaskPriority | '';
  dueDate: string;
};

export const emptyTaskForm: TaskFormValues = {
  title: '',
  status: 'to_do',
  priority: 'medium',
  dueDate: '',
};

/** The task form FM06: Title, Status, Priority and Due date. */
export function TaskForm({
  control,
  id,
  onSubmit,
  error,
}: {
  control: Control<TaskFormValues>;
  id: string;
  onSubmit: (event: React.FormEvent) => void;
  error?: string;
}) {
  return (
    <Form id={id} onSubmit={onSubmit} error={error} fill actions={null}>
      <Controller
        name="title"
        control={control}
        rules={{
          required: 'Enter the task title',
          maxLength: { value: 200, message: 'Keep the title to 200 characters' },
        }}
      >
        {({ field }) => <Input label="Title" autoComplete="off" {...field} />}
      </Controller>
      <Controller
        name="status"
        control={control}
        rules={{ required: 'Choose a status' }}
      >
        {({ field }) => (
          <Select label="Status" {...field}>
            {TaskStatusOptions.map((option) => (
              <SelectOption key={option.key} value={option.key} label={option.label} />
            ))}
          </Select>
        )}
      </Controller>
      <Controller
        name="priority"
        control={control}
        rules={{ required: 'Choose a priority' }}
      >
        {({ field }) => (
          <Select label="Priority" {...field}>
            {TaskPriorityOptions.map((option) => (
              <SelectOption key={option.key} value={option.key} label={option.label} />
            ))}
          </Select>
        )}
      </Controller>
      <Controller
        name="dueDate"
        control={control}
        rules={{
          validate: (value) =>
            value === '' || !Number.isNaN(new Date(value).getTime()) || 'Enter a date like 2026-11-08',
        }}
      >
        {({ field }) => <DateInput label="Due date" autoComplete="off" {...field} />}
      </Controller>
    </Form>
  );
}
