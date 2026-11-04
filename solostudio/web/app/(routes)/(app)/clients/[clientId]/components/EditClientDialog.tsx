'use client';

import { ClientForm, type ClientFormValues } from '@app/blocks/ClientDialogs/ClientForm';
import { getClient, updateClient, type Client } from '@app/entities/client';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import { useRouter } from 'next/navigation';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';


/** D02 Edit client: change a client's details or status. */
export function EditClientDialog({
  client,
  open,
  onOpenChange,
}: {
  client: Client;
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
  } = useForm<ClientFormValues>({
    defaultValues: {
      name: client.name,
      email: client.email,
      company: client.company ?? '',
      profile: client.profile ?? '',
      status: client.status,
    },
  });
  const [saving, setSaving] = useState(false);
  const [gone, setGone] = useState(false);
  const router = useRouter();

  const cancel = () => {
    onOpenChange(false);
    if (gone) router.push('/clients');
  };

  const save = async (values: ClientFormValues) => {
    setSaving(true);
    try {
      const current = await getClient(client.id);
      if (!current) {
        setGone(true);
        setError('root.server', { message: 'This client is gone.' });
        return;
      }
      await updateClient(client.id, {
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim() || undefined,
        profile: values.profile.trim() || undefined,
        status: values.status || client.status,
      });
      toast({ title: 'Client updated', status: 'success' });
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        setGone(true);
        setError('root.server', { message: 'This client is gone.' });
      } else {
        setError('root.server', { message: 'Saving failed. Try again.' });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title={`Edit ${client.name}`}
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <>
          <Button
            variant="base" // Cancel is the secondary action beside the main Save.
            onClick={cancel}
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
