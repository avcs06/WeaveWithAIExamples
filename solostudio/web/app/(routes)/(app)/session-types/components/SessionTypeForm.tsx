'use client';

import { Controller, Form } from '@packages/ui/Form';
import { Input, NumberInput } from '@packages/ui/Input';
import React from 'react';
import { type Control } from 'react-hook-form';

export type SessionTypeFormValues = {
  name: string;
  durationInMinutes: number | null;
  displayedPrice: number | null;
  maximumPeople: number | null;
};

export const emptySessionTypeForm: SessionTypeFormValues = {
  name: '',
  durationInMinutes: null,
  displayedPrice: null,
  maximumPeople: null,
};

const wholeBetween = (min: number, max: number, message: string) => (value: number | null) => {
  if (value === null || !Number.isInteger(value) || value < min || value > max) return message;
  return true;
};

/** The session type form FM08: Name, Duration, Displayed price, Maximum people. */
export function SessionTypeForm({
  control,
  id,
  onSubmit,
  error,
}: {
  control: Control<SessionTypeFormValues>;
  id: string;
  onSubmit: (event: React.FormEvent) => void;
  error?: string;
}) {
  return (
    <Form id={id} onSubmit={onSubmit} error={error} fill actions={null}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Enter the session type name',
          maxLength: { value: 120, message: 'Keep the name to 120 characters' },
        }}
      >
        {({ field }) => <Input label="Name" autoComplete="off" {...field} />}
      </Controller>
      <Controller
        name="durationInMinutes"
        control={control}
        rules={{
          required: 'Enter the duration in minutes',
          validate: {
            whole: wholeBetween(15, 480, 'Enter a whole number of minutes from 15 to 480'),
          },
        }}
      >
        {({ field }) => (
          <NumberInput
            label="Duration in minutes"
            autoComplete="off"
            allowDecimal={false}
            min={15}
            max={480}
            {...field}
          />
        )}
      </Controller>
      <Controller
        name="displayedPrice"
        control={control}
        rules={{
          required: 'Enter the displayed price',
          validate: {
            amount: (value: number | null) =>
              value === null || Number.isNaN(value) || value < 0
                ? 'Enter a price of 0 or more'
                : true,
          },
        }}
      >
        {({ field }) => (
          <NumberInput
            label="Displayed price"
            helpText="Shown for information only. Nobody pays in the app."
            autoComplete="off"
            min={0}
            {...field}
          />
        )}
      </Controller>
      <Controller
        name="maximumPeople"
        control={control}
        rules={{
          required: 'Enter the maximum people',
          validate: {
            whole: wholeBetween(1, 20, 'Enter a whole number of people from 1 to 20'),
          },
        }}
      >
        {({ field }) => (
          <NumberInput
            label="Maximum people"
            autoComplete="off"
            allowDecimal={false}
            min={1}
            max={20}
            {...field}
          />
        )}
      </Controller>
    </Form>
  );
}
