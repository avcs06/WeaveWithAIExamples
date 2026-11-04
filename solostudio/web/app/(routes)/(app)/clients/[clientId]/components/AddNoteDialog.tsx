'use client';

import { createNote } from '@app/entities/note';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import { emptyNoteForm, NoteForm, type NoteFormValues } from './NoteForm';

/** D03 Add a note: jot a dated note after a call with an optional follow-up. */
export function AddNoteDialog({
  clientId,
  open,
  onOpenChange,
}: {
  clientId: string;
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
  } = useForm<NoteFormValues>({ defaultValues: emptyNoteForm });
  const [saving, setSaving] = useState(false);

  const save = async (values: NoteFormValues) => {
    setSaving(true);
    try {
      await createNote({
        noteText: values.noteText.trim(),
        noteDate: values.noteDate,
        followUpDate: values.followUpDate || undefined,
        client: clientId,
      });
      toast({ title: 'Note saved', status: 'success' });
      onOpenChange(false);
    } catch {
      setError('root.server', { message: 'Saving failed. Try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title="Add a note"
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
            loadingWithReason={saving || isSubmitting ? 'Saving the note' : undefined}
          >
            Save
          </Button>
        </>
      }
    >
      <NoteForm
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
