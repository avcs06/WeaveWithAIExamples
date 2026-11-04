'use client';

import { updateSessionType, useGetSessionType, type SessionType } from '@app/entities/sessionType';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import { Paragraph } from '@packages/ui/Typography';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SessionTypeForm, type SessionTypeFormValues } from './SessionTypeForm';

/** D14 Edit session type: change length, price or seats; bookings are unchanged. */
export function EditSessionTypeDialog({
  sessionType,
  onOpenChange,
}: {
  sessionType: SessionType;
  onOpenChange: (open: boolean) => void;
}) {
  const formId = useId();
  const current = useGetSessionType(sessionType.id);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SessionTypeFormValues>({
    defaultValues: {
      name: sessionType.name,
      durationInMinutes: sessionType.durationInMinutes,
      displayedPrice: sessionType.displayedPrice,
      maximumPeople: sessionType.maximumPeople,
    },
  });
  const [saving, setSaving] = useState(false);

  if (!current.data && !current.loading) {
    return (
      <Dialog
        title={`Edit ${sessionType.name}`}
        open
        onOpenChange={onOpenChange}
        footer={
          <Button
            variant="base" // Cancel is the only way out once the session type is gone.
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        }
      >
        <Paragraph>That session type is gone.</Paragraph>
      </Dialog>
    );
  }

  const save = async (values: SessionTypeFormValues) => {
    setSaving(true);
    try {
      await updateSessionType(sessionType.id, {
        name: values.name.trim(),
        durationInMinutes: values.durationInMinutes ?? sessionType.durationInMinutes,
        displayedPrice: values.displayedPrice ?? sessionType.displayedPrice,
        maximumPeople: values.maximumPeople ?? sessionType.maximumPeople,
      });
      toast({ title: 'Session type updated', status: 'success' });
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        setError('root.server', { message: 'That session type is gone.' });
      } else {
        setError('root.server', { message: 'Saving failed. Try again.' });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title={`Edit ${sessionType.name}`}
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
      <Paragraph color="muted">Existing bookings are unchanged.</Paragraph>
    </Dialog>
  );
}
