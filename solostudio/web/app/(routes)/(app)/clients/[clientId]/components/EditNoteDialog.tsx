'use client';

import { updateNote, useGetNote, type Note } from '@app/entities/note';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import { Paragraph } from '@packages/ui/Typography';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import { NoteForm, type NoteFormValues } from './NoteForm';

/** D04 Edit note: correct a note and its follow-up date. */
export function EditNoteDialog({
  note,
  onOpenChange,
}: {
  note: Note;
  onOpenChange: (open: boolean) => void;
}) {
  const formId = useId();
  const current = useGetNote(note.id);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormValues>({
    defaultValues: {
      noteText: note.noteText,
      noteDate: note.noteDate,
      followUpDate: note.followUpDate ?? '',
    },
  });
  const [saving, setSaving] = useState(false);

  if (!current.data && !current.loading) {
    return (
      <Dialog
        title="Edit note"
        open
        onOpenChange={onOpenChange}
        footer={
          <Button
            variant="base" // Cancel is the only way out once the note is gone.
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        }
      >
        <Paragraph>This note is gone.</Paragraph>
      </Dialog>
    );
  }

  const save = async (values: NoteFormValues) => {
    setSaving(true);
    try {
      await updateNote(note.id, {
        noteText: values.noteText.trim(),
        noteDate: values.noteDate,
        followUpDate: values.followUpDate || undefined,
      });
      toast({ title: 'Note updated', status: 'success' });
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        setError('root.server', { message: 'This note is gone.' });
      } else {
        setError('root.server', { message: 'Saving failed. Try again.' });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title="Edit note"
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
