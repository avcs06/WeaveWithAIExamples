'use client';

import { ClientForm, emptyClientForm, type ClientFormValues } from '@app/blocks/ClientDialogs/ClientForm';
import { createClient, type Client } from '@app/entities/client';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';


/** D01 Add a client: a new client with status set to Lead by default. */
export function AddClientDialog({
  open,
  onOpenChange,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (client: Client) => void;
}) {
  const formId = useId();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormValues>({ defaultValues: emptyClientForm });
  const [saving, setSaving] = useState(false);

  const save = async (values: ClientFormValues) => {
    setSaving(true);
    try {
      const client = await createClient({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim() || undefined,
        profile: values.profile.trim() || undefined,
        status: values.status || 'lead',
      });
      toast({ title: 'Client saved', status: 'success' });
      onSaved(client);
    } catch {
      setError('root.server', { message: 'Saving failed. Try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title="Add a client"
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
            loadingWithReason={saving || isSubmitting ? 'Saving the client' : undefined}
          >
            Save
          </Button>
        </>
      }
    >
      <ClientForm
        control={control}
        id={formId}
        onSubmit={(event) => {
          clearErrors('root');
          void handleSubmit(save)(event);
        }}
        error={errors.root?.server?.message}
        actions={null}
      />
    </Dialog>
  );
}
