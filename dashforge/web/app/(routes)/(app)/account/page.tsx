'use client';

import { PageHeader } from '@app/components/PageHeader';
import { changePassword, useCurrentUser } from '@app/entities/auth';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { PasswordInput } from '@packages/ui/Input';
import { Section } from '@packages/ui/Section';
import { toast } from '@packages/ui/Toast';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@packages/ui/Typography';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = { currentPassword: string; newPassword: string };

export default function AccountPage() {
  const user = useCurrentUser();
  const [formError, setFormError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { currentPassword: '', newPassword: '' },
  });

  const onSubmit = async (values: FormValues) => {
    if (saving) return;
    setFormError(undefined);
    if (!values.currentPassword || values.newPassword.length < 8 || values.newPassword.length > 128) {
      setFormError('Current password is required and new password must be 8 to 128 characters');
      reset({ currentPassword: '', newPassword: '' });
      return;
    }
    setSaving(true);
    try {
      await changePassword(values.currentPassword, values.newPassword);
      toast({ title: 'Password changed' });
      reset({ currentPassword: '', newPassword: '' });
    } catch (err: unknown) {
      const msg = (err as Error).message;
      if ((err as { code?: string }).code === 'incorrect' || msg === 'Current password is incorrect.') {
        setFormError('Current password is incorrect.');
      } else if (msg.includes('required and new password')) {
        setFormError(msg);
      } else {
        setFormError('Could not update password. Try again.');
      }
      reset({ currentPassword: '', newPassword: '' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Account" />
      <Section title="Your account">
        <DescriptionList>
          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>{user && typeof user === 'object' ? (user as { email: string }).email : ''}</DescriptionDetails>
        </DescriptionList>
      </Section>
      <Section title="Change password">
        <Form
          error={formError}
          onSubmit={handleSubmit(onSubmit)}
          actions={
            <Button type="submit" loadingWithReason={saving ? 'Saving password' : undefined}>
              Save
            </Button>
          }
        >
          <Controller
            name="currentPassword"
            control={control}
            rules={{ required: 'Current password is required and new password must be 8 to 128 characters' }}
          >
            {({ field }) => <PasswordInput label="Current password" autoComplete="current-password" {...field} />}
          </Controller>
          <Controller
            name="newPassword"
            control={control}
            rules={{ required: 'Current password is required and new password must be 8 to 128 characters' }}
          >
            {({ field }) => <PasswordInput label="New password" autoComplete="new-password" {...field} />}
          </Controller>
        </Form>
      </Section>
    </>
  );
}
