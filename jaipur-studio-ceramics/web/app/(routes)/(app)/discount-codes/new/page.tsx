'use client';

// Loads its records through listDiscountCodes.
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import {
  createDiscountCode,
  useListDiscountCodes,
} from '@app/entities/discountCode';
import { DiscountTypeOptions } from '@app/entities/enums';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { DateInput, Input, NumberInput } from '@packages/ui/Input';
import { Radio, RadioGroup } from '@packages/ui/Radio';
import { toast } from '@packages/ui/Toast';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type DiscountFormValues = {
  code: string;
  discountType: string;
  discountValue: number | null;
  expiryDate: string;
};

const emptyValues: DiscountFormValues = {
  code: '',
  discountType: '',
  discountValue: null,
  expiryDate: '',
};

const todayString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function CreateDiscountCodePage() {
  const router = useRouter();
  const { data, loading, error, retry } = useListDiscountCodes();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<DiscountFormValues>({ defaultValues: emptyValues });
  // Save waits while a field error shows; a root server error never blocks
  // trying the save again.
  const canSubmit = Object.keys(errors).every((key) => key === 'root');

  useEffect(
    () => watch(() => clearErrors('root')).unsubscribe,
    [watch, clearErrors],
  );

  if (loading) {
    return (
      <LoadingView
        title="Create discount code"
        message="Loading the discount codes…"
      />
    );
  }

  if (error) {
    return (
      <LoadFailedView
        title="Create discount code"
        message="Something went wrong while loading the discount codes."
        onRetry={retry}
      />
    );
  }

  const save = async (values: DiscountFormValues) => {
    const taken = (data ?? []).some(
      (code) =>
        (code.discountCode ?? '').toLowerCase() ===
        values.code.trim().toLowerCase(),
    );
    if (taken) {
      setError('code', { message: 'That code is already used.' });
      return;
    }
    try {
      await createDiscountCode({
        discountCode: values.code.trim(),
        discountType: values.discountType as 'percentage' | 'fixed_amount',
        discountValue: values.discountValue ?? 0,
        expiryDate: values.expiryDate,
        status: 'active',
      });
    } catch {
      setError('root.server', {
        message: 'Saving failed and nothing was saved.',
      });
      return;
    }
    toast({
      title: 'Discount code saved',
      description: `Code ${values.code.trim()} is now Active.`,
      status: 'success',
    });
    router.push('/discount-codes');
  };

  return (
    <>
      <PageHeader title="Create discount code" />
      <Form
        onSubmit={handleSubmit(save)}
        error={errors.root?.server?.message}
        actions={
          <>
            <Button
              variant="base" // Quiet way out beside the main save.
              as={NextLink}
              href="/discount-codes"
              onClick={() =>
                toast({
                  title: 'Nothing was saved',
                  description: 'The discount code list is unchanged.',
                  status: 'info',
                })
              }
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabledWithReason={canSubmit ? undefined : 'Fix the errors above'}
              loadingWithReason={isSubmitting ? 'Saving the code' : undefined}
            >
              Save
            </Button>
          </>
        }
      >
        <Controller
          name="code"
          control={control}
          rules={{
            required: 'Enter the discount code',
            maxLength: {
              value: 30,
              message: 'Keep the code to 30 characters or fewer',
            },
          }}
        >
          {({ field }) => (
            <Input
              label="Discount code"
              autoComplete="off"
              {...field}
              onChange={(value) => {
                field.onChange(value);
                if (errors.code) clearErrors('code');
              }}
            />
          )}
        </Controller>
        <Controller
          name="discountType"
          control={control}
          rules={{
            required: 'Choose a discount type',
            deps: ['discountValue'],
          }}
        >
          {({ field }) => (
            // Two visible options with no popup, so keyboard focus moves straight through the group.
            <RadioGroup
              label="Discount type"
              {...field}
              className="flex-col-gap-2"
            >
              {DiscountTypeOptions.map((option) => (
                <Radio key={option.key} value={option.key}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        </Controller>
        <Controller
          name="discountValue"
          control={control}
          rules={{
            required: 'Enter the discount value',
            validate: (value) => {
              if (value === null) return true;
              if (!(value > 0)) return 'Enter a value greater than 0';
              if (
                getValues('discountType') === 'percentage' &&
                value > 100
              ) {
                return 'A percentage cannot be more than 100';
              }
              return true;
            },
          }}
        >
          {({ field }) => (
            <NumberInput
              label="Discount value"
              autoComplete="off"
              min={0}
              {...field}
            />
          )}
        </Controller>
        <Controller
          name="expiryDate"
          control={control}
          rules={{
            required: 'Choose the expiry date',
            validate: (value) =>
              value === '' ||
              value > todayString() ||
              'Choose a date in the future',
          }}
        >
          {({ field }) => (
            <DateInput label="Expiry date" autoComplete="off" {...field} />
          )}
        </Controller>
      </Form>
    </>
  );
}
