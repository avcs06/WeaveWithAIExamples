'use client';

import { Controller, Form } from '@packages/ui/Form';
import { DateInput, Input } from '@packages/ui/Input';
import { Select, SelectOption } from '@packages/ui/Select';
import { Textarea } from '@packages/ui/Textarea';
import React from 'react';
import { type Control } from 'react-hook-form';

import type { Client } from '@app/entities/client';

export type ProjectFormValues = {
  name: string;
  description: string;
  dueDate: string;
  client: string;
};

/** The project form FM05: Name, Description, Due date and Client. */
export function ProjectForm({
  control,
  id,
  onSubmit,
  error,
  clients,
}: {
  control: Control<ProjectFormValues>;
  id: string;
  onSubmit: (event: React.FormEvent) => void;
  error?: string;
  clients: Client[];
}) {
  return (
    <Form id={id} onSubmit={onSubmit} error={error} fill actions={null}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Enter the project name',
          maxLength: { value: 200, message: 'Keep the name to 200 characters' },
        }}
      >
        {({ field }) => <Input label="Name" autoComplete="off" {...field} />}
      </Controller>
      <Controller
        name="description"
        control={control}
        rules={{
          required: 'Enter the project description',
          maxLength: { value: 2000, message: 'Keep the description to 2000 characters' },
        }}
      >
        {({ field }) => <Textarea label="Description" {...field} />}
      </Controller>
      <Controller
        name="dueDate"
        control={control}
        rules={{
          validate: (value) =>
            value === '' || !Number.isNaN(new Date(value).getTime()) || 'Enter a date like 2026-12-15',
        }}
      >
        {({ field }) => <DateInput label="Due date" autoComplete="off" {...field} />}
      </Controller>
      <Controller
        name="client"
        control={control}
        rules={{ required: 'Choose a client' }}
      >
        {({ field }) => (
          <Select label="Client" {...field}>
            {clients.map((client) => (
              <SelectOption key={client.id} value={client.id} label={client.name} />
            ))}
          </Select>
        )}
      </Controller>
    </Form>
  );
}
