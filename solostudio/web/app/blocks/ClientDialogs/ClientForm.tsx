'use client';

import { ClientStatus, ClientStatusOptions } from '@app/entities/enums';
import { Controller, Form } from '@packages/ui/Form';
import { Input } from '@packages/ui/Input';
import { Select, SelectOption } from '@packages/ui/Select';
import { Textarea } from '@packages/ui/Textarea';
import React from 'react';
import { type Control } from 'react-hook-form';

export type ClientFormValues = {
  name: string;
  email: string;
  company: string;
  profile: string;
  status: ClientStatus | '';
};

export const emptyClientForm: ClientFormValues = {
  name: '',
  email: '',
  company: '',
  profile: '',
  status: 'lead',
};

/** The client form FM03: Name, Email, Company, Profile and Status. */
export function ClientForm({
  control,
  id,
  onSubmit,
  error,
  actions,
}: {
  control: Control<ClientFormValues>;
  id: string;
  onSubmit: (event: React.FormEvent) => void;
  error?: string;
  actions: React.ReactNode;
}) {
  return (
    <Form id={id} onSubmit={onSubmit} error={error} fill actions={actions}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Enter the client name',
          maxLength: { value: 120, message: 'Keep the name to 120 characters' },
        }}
      >
        {({ field }) => <Input label="Name" autoComplete="off" {...field} />}
      </Controller>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Enter the client email',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Enter an email like name@example.com',
          },
          maxLength: { value: 254, message: 'Keep the email to 254 characters' },
        }}
      >
        {({ field }) => <Input label="Email" type="email" autoComplete="email" {...field} />}
      </Controller>
      <Controller
        name="company"
        control={control}
        rules={{
          maxLength: { value: 120, message: 'Keep the company to 120 characters' },
        }}
      >
        {({ field }) => <Input label="Company" autoComplete="organization" {...field} />}
      </Controller>
      <Controller
        name="profile"
        control={control}
        rules={{
          maxLength: { value: 2000, message: 'Keep the profile to 2000 characters' },
        }}
      >
        {({ field }) => (
          <Textarea
            label="Profile"
            helpText="What they do, how you met and what they pay."
            {...field}
          />
        )}
      </Controller>
      <Controller
        name="status"
        control={control}
        rules={{ required: 'Choose a status' }}
      >
        {({ field }) => (
          <Select label="Status" {...field}>
            {ClientStatusOptions.map((option) => (
              <SelectOption key={option.key} value={option.key} label={option.label} />
            ))}
          </Select>
        )}
      </Controller>
    </Form>
  );
}
