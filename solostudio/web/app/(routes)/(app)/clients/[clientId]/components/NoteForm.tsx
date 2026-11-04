'use client';

import { todayKey } from '@app/blocks/Format/format';
import { Controller, Form } from '@packages/ui/Form';
import { DateInput } from '@packages/ui/Input';
import { Textarea } from '@packages/ui/Textarea';
import React from 'react';
import { type Control } from 'react-hook-form';

export type NoteFormValues = {
  noteText: string;
  noteDate: string;
  followUpDate: string;
};

export const emptyNoteForm: NoteFormValues = {
  noteText: '',
  noteDate: todayKey(),
  followUpDate: '',
};

/** The note form FM04: Note text, Note date and Follow-up date. */
export function NoteForm({
  control,
  id,
  onSubmit,
  error,
}: {
  control: Control<NoteFormValues>;
  id: string;
  onSubmit: (event: React.FormEvent) => void;
  error?: string;
}) {
  return (
    <Form id={id} onSubmit={onSubmit} error={error} fill actions={null}>
      <Controller
        name="noteText"
        control={control}
        rules={{
          required: 'Enter the note text',
          maxLength: { value: 5000, message: 'Keep the note to 5000 characters' },
        }}
      >
        {({ field }) => <Textarea label="Note text" {...field} />}
      </Controller>
      <Controller
        name="noteDate"
        control={control}
        rules={{ required: 'Enter the note date' }}
      >
        {({ field }) => <DateInput label="Note date" autoComplete="off" {...field} />}
      </Controller>
      <Controller
        name="followUpDate"
        control={control}
        rules={{
          validate: (value) =>
            value === '' || !Number.isNaN(new Date(value).getTime()) || 'Enter a date like 2026-11-10',
        }}
      >
        {({ field }) => <DateInput label="Follow-up date" autoComplete="off" {...field} />}
      </Controller>
    </Form>
  );
}
