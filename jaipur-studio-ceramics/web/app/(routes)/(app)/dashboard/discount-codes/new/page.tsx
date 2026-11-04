'use client';

import { todayKey } from '@app/blocks/orders';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import {
  createDiscountCode,
  useListDiscountCodes,
} from '@app/entities/discountCode';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { DateInput, Input, NumberInput } from '@packages/ui/Input';
import { Radio, RadioGroup } from '@packages/ui/Radio';
import { toast } from '@packages/ui/Toast';
import { Paragraph } from '@packages/ui/Typography';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

type CodeValues = {
  code: string;
  discountType: string;
  discountValue: number | null;
  expiryDate: string;
};

/** Create a discount code with a type, value and expiry date. */
export default function NewDiscountCodePage() {
  const router = useRouter();
  const existing = useListDiscountCodes();
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CodeValues>({
    defaultValues: { code: '', discountType: '', discountValue: null, expiryDate: '' },
  });

  const submit = async (values: CodeValues) => {
    const taken = (existing.data ?? []).some(
      (code) => code.code.toUpperCase() === values.code.trim().toUpperCase(),
    );
    if (taken) {
      setError('code', {
        message: 'That code already exists. Change it and try again.',
      });
      return;
    }
    try {
      await createDiscountCode({
        code: values.code.trim().toUpperCase(),
        discountType: values.discountType as 'percentage' | 'fixed_amount',
        discountValue: values.discountValue ?? 1,
        expiryDate: values.expiryDate,
        status: 'active',
      });
      toast({ title: 'Discount code saved', status: 'success' });
      router.push('/dashboard/discount-codes');
    } catch {
      setError('root', {
        message: 'The code could not be saved. Try again.',
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Create a discount code"
        description="A new promotion buyers can use once per order at checkout."
        breadcrumb={[
          { label: 'Discount codes', href: '/dashboard/discount-codes' },
        ]}
      />
      <Form
        onSubmit={handleSubmit(submit)}
        error={errors.root?.message}
        actions={
          <>
            <Button
              // Leaving without saving is the quiet way out beside saving.
              variant="base"
              as={NextLink}
              href="/dashboard/discount-codes"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loadingWithReason={isSubmitting ? 'Saving the code' : undefined}
            >
              Save discount code
            </Button>
          </>
        }
      >
        <Controller
          name="code"
          control={control}
          rules={{ required: 'Enter the code' }}
        >
          {({ field }) => (
            <Input
              label="Code"
              autoComplete="off"
              placeholder="WEEKEND10"
              {...field}
            />
          )}
        </Controller>
        <Controller
          name="discountType"
          control={control}
          rules={{ required: 'Choose percentage or a fixed amount' }}
        >
          {({ field }) => (
            <RadioGroup
              label="Discount type"
              {...field}
              className="flex-col-gap-2"
            >
              <Radio value="percentage">Percentage</Radio>
              <Radio value="fixed_amount">Fixed amount</Radio>
            </RadioGroup>
          )}
        </Controller>
        <Controller
          name="discountValue"
          control={control}
          rules={{
            required: 'Enter the discount value',
            min: { value: 1, message: 'The value must be at least 1' },
            validate: (value) =>
              getValues('discountType') !== 'percentage' ||
              value === null ||
              value <= 100 ||
              'A percentage cannot be greater than 100',
          }}
        >
          {({ field }) => (
            <NumberInput
              label="Discount value"
              autoComplete="off"
              allowDecimal={false}
              min={0}
              {...field}
            />
          )}
        </Controller>
        <Controller
          name="expiryDate"
          control={control}
          rules={{
            required: 'Enter the expiry date',
            validate: (date) =>
              date === '' ||
              date >= todayKey() ||
              'The expiry date must be in the future',
          }}
        >
          {({ field }) => (
            <DateInput label="Expiry date" autoComplete="off" {...field} />
          )}
        </Controller>
      </Form>
      {existing.error ? (
        <Paragraph color="error" role="alert">
          Existing codes could not be loaded, so a duplicate code would only be
          caught when saving.
        </Paragraph>
      ) : null}
    </>
  );
}
