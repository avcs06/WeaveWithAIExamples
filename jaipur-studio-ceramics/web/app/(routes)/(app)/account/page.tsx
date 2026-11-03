'use client';

// Loads its records through nothing: the signed-in user comes from the auth hook.
import { LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { updateAccount, useCurrentUser } from '@app/entities/auth';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { Input, PasswordInput } from '@packages/ui/Input';
import { toast } from '@packages/ui/Toast';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Paragraph,
} from '@packages/ui/Typography';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type AccountFormValues = {
  email: string;
  password: string;
};

export default function AccountPage() {
  const currentUser = useCurrentUser();
  const [editing, setEditing] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormValues>({
    defaultValues: { email: '', password: '' },
  });

  if (currentUser === undefined) {
    return <LoadingView title="Account" message="Loading your account…" />;
  }

  if (currentUser === null) {
    return (
      <>
        <PageHeader title="Account" />
        <div className="flex-col-gap-4 items-start">
          <Paragraph>You are signed out. Sign in to see your account.</Paragraph>
          <Button as={NextLink} href="/sign-in">
            Sign in
          </Button>
        </div>
      </>
    );
  }

  const startEditing = () => {
    reset({ email: currentUser.email, password: '' });
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const save = async (values: AccountFormValues) => {
    try {
      await updateAccount(values.email.trim(), values.password);
    } catch {
      setError('root.server', {
        message: 'Saving failed and your account is unchanged.',
      });
      return;
    }
    toast({
      title: 'Account saved',
      description: `Signed in as ${values.email.trim()}.`,
      status: 'success',
    });
    setEditing(false);
  };

  if (!editing) {
    return (
      <>
        <PageHeader
          title="Account"
          actions={<Button onClick={startEditing}>Edit</Button>}
        />
        <DescriptionList>
          <div>
            <DescriptionTerm>Email</DescriptionTerm>
            <DescriptionDetails>{currentUser.email}</DescriptionDetails>
          </div>
        </DescriptionList>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Account" />
      <Form
        onSubmit={handleSubmit(save)}
        error={errors.root?.server?.message}
        actions={
          <>
            <Button
              variant="base" // Quiet way out that leaves the account unchanged.
              onClick={cancelEditing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loadingWithReason={isSubmitting ? 'Saving the account' : undefined}
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
            required: 'Enter your email',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Enter an email like name@example.com',
            },
          }}
        >
          {({ field }) => (
            <Input label="Email" type="email" autoComplete="email" {...field} />
          )}
        </Controller>
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Enter your password',
            minLength: { value: 8, message: 'Use 8 or more characters' },
          }}
        >
          {({ field }) => (
            <PasswordInput
              label="Password"
              autoComplete="new-password"
              {...field}
            />
          )}
        </Controller>
      </Form>
    </>
  );
}
