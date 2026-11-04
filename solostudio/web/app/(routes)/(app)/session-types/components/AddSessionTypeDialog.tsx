'use client';

import { createSessionType } from '@app/entities/sessionType';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import { emptySessionTypeForm, SessionTypeForm, type SessionTypeFormValues } from './SessionTypeForm';

/** D13 Add a session type: offer a new kind of bookable session. */
export function AddSessionTypeDialog({
  open,
  onOpenChange,
}: {
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
  } = useForm<SessionTypeFormValues>({ defaultValues: emptySessionTypeForm });
  const [saving, setSaving] = useState(false);

  const save = async (values: SessionTypeFormValues) => {
    setSaving(true);
    try {
      await createSessionType({
        name: values.name.trim(),
        durationInMinutes: values.durationInMinutes ?? 0,
        displayedPrice: values.displayedPrice ?? 0,
        maximumPeople: values.maximumPeople ?? 0,
      });
      toast({ title: 'Session type saved', status: 'success' });
      onOpenChange(false);
    } catch {
      setError('root.server', { message: 'Saving failed. Try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title="Add a session type"
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
            loadingWithReason={saving || isSubmitting ? 'Saving the session type' : undefined}
          >
            Save
          </Button>
        </>
      }
    >
      <SessionTypeForm
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
