'use client';

// Loads its records through lookupOrder and getPiece.
import { OrderDetails } from '@app/blocks/OrderDetails';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { lookupOrder } from '@app/entities/order';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { Input } from '@packages/ui/Input';
import { Paragraph } from '@packages/ui/Typography';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { OrderLinePhoto } from './components/OrderLinePhoto';

import type { Order } from '@app/entities/order';

type LookupValues = {
  orderReference: string;
  phoneNumber: string;
};

const emptyLookup: LookupValues = { orderReference: '', phoneNumber: '' };

export default function OrderLookupPage() {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LookupValues>({ defaultValues: emptyLookup });
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(
    () => watch(() => clearErrors('root')).unsubscribe,
    [watch, clearErrors],
  );

  const find = async ({ orderReference, phoneNumber }: LookupValues) => {
    setNotFound(false);
    setOrder(null);
    try {
      const found = await lookupOrder(orderReference.trim());
      if (!found || found.phoneNumber !== phoneNumber.trim()) {
        setNotFound(true);
        return;
      }
      setOrder(found);
    } catch {
      setError('root.lookup', {
        message: 'Could not look up the order. Try finding it again.',
      });
    }
  };

  const invalid = () => {
    setError('root.invalid', {
      message: 'Check the order reference and phone number and try again.',
    });
  };

  return (
    <>
      <PageHeader title="Find your order" />
      <div className="flex-col-gap-6 items-start">
        <Form
          onSubmit={handleSubmit(find, invalid)}
          error={errors.root?.lookup?.message ?? errors.root?.invalid?.message}
          actions={
            <Button
              type="submit"
              loadingWithReason={isSubmitting ? 'Finding the order' : undefined}
            >
              Find order
            </Button>
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
                placeholder="JSC-1024"
                {...field}
              />
            )}
          </Controller>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: 'Enter the phone number',
              validate: (value) =>
                value.replace(/\D/g, '').length >= 10 ||
                'Enter a phone number with at least 10 digits.',
            }}
          >
            {({ field }) => (
              <Input label="Phone number" autoComplete="tel" {...field} />
            )}
          </Controller>
        </Form>
        {notFound ? (
          <Paragraph>
            No order was found for that reference and phone number. Check the
            values and try again.
          </Paragraph>
        ) : null}
        <NextLink look="plain" href="/pieces">
          Browse pieces
        </NextLink>
        {order ? (
          <div className="flex-col-gap-4 items-start">
            <div
              className="flex-row-gap-2 flex-wrap"
              aria-label="Ordered pieces"
            >
              {order.pieces.map((pieceId, at) => (
                <LinePhoto
                  key={`${pieceId}-${at}`}
                  photo={photoFor(pieceId)}
                  name={order.orderedPieceName[at] ?? 'Ordered piece'}
                />
              ))}
            </div>
            <OrderDetails order={order} />
          </div>
        ) : null}
      </div>
    </>
  );
}
