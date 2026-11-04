'use client';

import { isValidIndianPhone } from '@app/blocks/orders';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { useLookupOrder } from '@app/entities/order';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { Input } from '@packages/ui/Input';
import { Paragraph } from '@packages/ui/Typography';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

type LookupValues = { orderReference: string; phone: string };

/** Find a placed order again from its reference and phone number. */
export default function OrderLookupPage() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LookupValues>({
    defaultValues: { orderReference: '', phone: '' },
  });

  const lookup = useLookupOrder();

  const submit = ({ orderReference, phone }: LookupValues) => {
    if (lookup.error) {
      lookup.retry();
      setError('root', {
        message: 'The lookup failed. Try again.',
      });
      return;
    }
    const match = (lookup.data ?? []).find(
      (order) =>
        order.orderReference === orderReference.trim() &&
        order.phoneNumber === phone.trim(),
    );
    if (!match) {
      setError('root', {
        message:
          'No order matches those values. Check the reference and phone number and try again.',
      });
      return;
    }
    router.push(`/orders/${match.orderReference}`);
  };

  return (
    <>
      <PageHeader
        title="Look up an order"
        description="Find a placed order with its reference and the phone number from checkout."
      />
      <Form
        onSubmit={handleSubmit(submit)}
        error={errors.root?.message}
        actions={
          <>
            <Button
              // Going back to the shop is the quiet way out beside finding.
              variant="base"
              as={NextLink}
              href="/shop"
            >
              Back to the shop
            </Button>
            <Button
              type="submit"
              loadingWithReason={isSubmitting ? 'Finding your order' : undefined}
            >
              Find my order
            </Button>
          </>
        }
      >
        <Controller
          name="orderReference"
          control={control}
          rules={{ required: 'Enter the order reference' }}
        >
          {({ field }) => (
            <Input
              label="Order reference"
              autoComplete="off"
              placeholder="JSC-4821"
              {...field}
            />
          )}
        </Controller>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Enter your phone number',
            validate: (phone) =>
              isValidIndianPhone(phone) ||
              'Enter a valid 10-digit Indian mobile number',
          }}
        >
          {({ field }) => (
            <Input
              label="Phone number"
              type="tel"
              autoComplete="tel"
              {...field}
            />
          )}
        </Controller>
      </Form>
      <Paragraph color="muted">
        After placing an order you get a reference like JSC-4821. Keep it with
        your phone number to find the order again.
      </Paragraph>
    </>
  );
}
