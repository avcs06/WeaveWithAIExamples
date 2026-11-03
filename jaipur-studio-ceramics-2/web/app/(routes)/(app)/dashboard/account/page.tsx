'use client';

import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { changePassword, useCurrentUser } from '@app/entities/auth';
import { Button, IconButton } from '@packages/ui/Button';
import { Controller } from '@packages/ui/Form';
import { PasswordInput } from '@packages/ui/Input';
import { toast } from '@packages/ui/Toast';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Paragraph,
} from '@packages/ui/Typography';
import { Check, Pencil, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type PasswordValues = { password: string };

/** The owner's own sign-in details, with the password changed in place. */
export default function AccountPage() {
  const user = useCurrentUser();
  const [editing, setEditing] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({ defaultValues: { password: '' } });

  const startEdit = () => {
    reset({ password: '' });
    setEditing(true);
  };

  const cancelEdit = () => {
    reset({ password: '' });
    setEditing(false);
  };

  if (user === undefined) return null;

  if (user === null) {
    return (
      <>
        <PageHeader
          title="Account"
          description="Your own sign-in details."
        />
        <Button as={NextLink} href="/sign-in">
          Sign in
        </Button>
      </>
    );
  }

  const save = async ({ password }: PasswordValues) => {
    if (password.length < 8) {
      reset({ password: '' });
      setError('password', {
        message: 'Enter a password of at least 8 characters.',
      });
      return;
    }
    try {
      await changePassword(password);
      toast({ title: 'Password saved', status: 'success' });
      setEditing(false);
      reset({ password: '' });
    } catch {
      setError('root', {
        message: 'Saving failed. The account is unchanged. Try again.',
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Account"
        description="Your own sign-in details."
      />
      <DescriptionList>
        <div>
          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>{user.email}</DescriptionDetails>
        </div>
        <div>
          <DescriptionTerm>Password</DescriptionTerm>
          <DescriptionDetails>
            {editing ? (
              <span className="flex-row-gap-2 items-center">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Enter a new password of at least 8 characters',
                  }}
                >
                  {({ field }) => (
                    <PasswordInput
                      aria-label="New password"
                      autoComplete="new-password"
                      {...field}
                    />
                  )}
                </Controller>
                <IconButton
                  tooltip="Save password"
                  aria-label="Save password"
                  loadingWithReason={isSubmitting ? 'Saving the password' : undefined}
                  onClick={handleSubmit(save)}
                >
                  <Check />
                </IconButton>
                <IconButton
                  // Cancel sits beside save, quiet like other row actions.
                  look="ghost"
                  tooltip="Cancel password change"
                  aria-label="Cancel password change"
                  onClick={cancelEdit}
                >
                  <X />
                </IconButton>
              </span>
            ) : (
              <span className="flex-row-gap-2 items-center">
                <span aria-hidden="true">••••••••</span>
                <IconButton
                  // Edit sits beside its value, quiet like other row actions.
                  look="ghost"
                  tooltip="Edit password"
                  aria-label="Edit password"
                  onClick={startEdit}
                >
                  <Pencil />
                </IconButton>
              </span>
            )}
          </DescriptionDetails>
        </div>
      </DescriptionList>
      {errors.root?.message ? (
        <Paragraph color="error" role="alert">
          {errors.root.message}
        </Paragraph>
      ) : null}
    </>
  );
}
