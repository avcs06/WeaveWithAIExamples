'use client';

import { PageHeader } from '@app/components/PageHeader';
import { updateAccount, useCurrentUser } from '@app/entities/auth';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { Input, PasswordInput } from '@packages/ui/Input';
import { toast } from '@packages/ui/Toast';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@packages/ui/Typography';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type AccountFormValues = { email: string; password: string };

/**
 * S16 Account settings: see and change the sign-in email and password.
 * The password is checked here and never stored.
 */
export default function AccountPage() {
  const user = useCurrentUser();
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  return (
    <>
      <PageHeader
        title="Account settings"
        description="How you sign in to your workspace."
        actions={
          !editing ? (
            <Button onClick={() => setEditing(true)}>
              Edit
            </Button>
          ) : undefined
        }
      />
      {editing ? (
        <AccountEditor
          key={user.email}
          currentEmail={user.email}
          saving={false}
          onDone={() => setEditing(false)}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <DescriptionList>
          <div>
            <DescriptionTerm>Sign-in email</DescriptionTerm>
            <DescriptionDetails>{user.email}</DescriptionDetails>
          </div>
        </DescriptionList>
      )}
    </>
  );
}

function AccountEditor({
  currentEmail,
  saving,
  onDone,
  onCancel,
}: {
  currentEmail: string;
  saving: boolean;
  onDone: () => void;
  onCancel: () => void;
}) {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormValues>({ defaultValues: { email: currentEmail, password: '' } });
  const [busy, setBusy] = useState(saving);

  const save = async (values: AccountFormValues) => {
    setBusy(true);
    try {
      await updateAccount({ email: values.email.trim(), password: values.password });
      toast({ title: 'Account saved', status: 'success' });
      onDone();
    } catch (error) {
      if (error instanceof Error && (error as Error & { code?: string }).code === 'email-taken') {
        setError('email', { message: 'That email is already in use' });
      } else {
        setError('root.server', { message: 'Saving failed. Try again.' });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form
      onSubmit={(event) => {
        clearErrors('root');
        void handleSubmit(save)(event);
      }}
      error={errors.root?.server?.message}
      actions={
        <>
          <Button
            variant="base" // Cancel is the secondary action beside the main Done.
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loadingWithReason={busy || isSubmitting ? 'Saving your account' : undefined}
          >
            Done
          </Button>
        </>
      }
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Enter your sign-in email',
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
        name="password"
        control={control}
        rules={{
          required: 'Enter a password',
          minLength: { value: 8, message: 'Use 8 or more characters' },
          maxLength: { value: 128, message: 'Keep the password to 128 characters' },
        }}
      >
        {({ field }) => (
          <PasswordInput
            label="Password"
            autoComplete="new-password"
            helpText="Use 8 or more characters."
            {...field}
          />
        )}
      </Controller>
    </Form>
  );
}
