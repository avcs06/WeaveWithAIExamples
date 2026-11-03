'use client';

import { useCartStore } from '@app/blocks/Cart';
import {
  OrderItems,
  OrderTotals,
  PickupInfo,
  discountFor,
  isCodeUsable,
  isValidIndianPhone,
  isValidPinCode,
  nextOrderReference,
  shippingFor,
} from '@app/blocks/orders';
import { findVariant, sizeLabel } from '@app/blocks/pieces';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { useGetDiscountCodeByCode } from '@app/entities/discountCode';
import { createOrderWithStock, useListOrders } from '@app/entities/order';
import { useListPieces } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { Input } from '@packages/ui/Input';
import { Radio, RadioGroup } from '@packages/ui/Radio';
import { Paragraph } from '@packages/ui/Typography';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type CheckoutValues = {
  name: string;
  phone: string;
  fulfilmentChoice: string;
  deliveryAddress: string;
  city: string;
  pinCode: string;
  discountCode: string;
};

/** Checkout: contact, fulfilment and an optional discount code, then order. */
export default function CheckoutPage() {
  const router = useRouter();
  const pieces = useListPieces();
  const orders = useListOrders();
  const references = (orders.data ?? []).map((order) => order.orderReference);
  const lines = useCartStore((state) => state.lines);
  const clearLines = useCartStore((state) => state.clearLines);
  const [appliedCode, setAppliedCode] = useState('');
  const [stockProblems, setStockProblems] = useState('');

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    defaultValues: {
      name: '',
      phone: '',
      fulfilmentChoice: '',
      deliveryAddress: '',
      city: '',
      pinCode: '',
      discountCode: '',
    },
  });

  const choice = watch('fulfilmentChoice');
  const codeLookup = useGetDiscountCodeByCode(appliedCode);
  const usableCode =
    codeLookup.data && isCodeUsable(codeLookup.data)
      ? codeLookup.data
      : undefined;
  const codeInvalid =
    appliedCode !== '' && !codeLookup.loading && !usableCode;

  const subtotal = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const discount = discountFor(subtotal, usableCode);
  const shipping = shippingFor(
    subtotal - discount,
    choice as 'studio_pickup' | 'courier_delivery' | '',
  );
  const total = subtotal - discount + shipping;

  const applyDiscount = () => {
    setAppliedCode(getValues('discountCode').trim().toUpperCase());
  };

  const submit = async (values: CheckoutValues) => {
    setStockProblems('');
    const records = pieces.data ?? [];

    if (values.discountCode.trim() !== '') {
      if (!usableCode) {
        setError('discountCode', {
          message:
            'That code is invalid, expired or deactivated. Correct it or place the order without it.',
        });
        return;
      }
    }

    const problems = lines.filter((line) => {
      const piece = records.find((entry) => entry.id === line.pieceId);
      const stock = piece
        ? (findVariant(piece, line.glaze, line.size)?.stock ?? 0)
        : 0;
      return stock < line.quantity;
    });
    if (problems.length > 0) {
      setStockProblems(
        `No longer available in the wanted quantity: ${problems
          .map((line) => `${line.title}, ${line.glaze} in ${sizeLabel(line.size)}`)
          .join('; ')}.`,
      );
      return;
    }

    try {
      const order = await createOrderWithStock(
        {
          name: values.name.trim(),
          phoneNumber: values.phone.trim(),
          fulfilmentChoice: values.fulfilmentChoice as
            | 'studio_pickup'
            | 'courier_delivery',
          ...(values.fulfilmentChoice === 'courier_delivery'
            ? {
                deliveryAddress: values.deliveryAddress.trim(),
                city: values.city.trim(),
                pinCode: values.pinCode.trim(),
              }
            : {}),
          ...(usableCode ? { discountCode: usableCode.code } : {}),
          orderReference: nextOrderReference(references),
          itemPieceId: lines.map((line) => line.pieceId),
          quantity: lines.map((line) => line.quantity),
          itemTitle: lines.map((line) => line.title),
          itemGlaze: lines.map((line) => line.glaze),
          itemSize: lines.map(
            (line) => line.size as 'small' | 'medium' | 'large',
          ),
          itemPrice: lines.map((line) => line.price),
          subtotal,
          discountAmount: discount,
          shippingCost: shipping,
          total,
          paymentStatus: 'unpaid',
          fulfilmentStatus: 'new',
        },
        lines.map((line) => ({
          pieceId: line.pieceId,
          glaze: line.glaze,
          size: line.size,
          quantity: line.quantity,
        })),
      );
      clearLines();
      router.push(`/orders/${order.orderReference}`);
    } catch (error) {
      if (
        error instanceof Error &&
        (/no longer available/.test(error.message) ||
          /left for/.test(error.message))
      ) {
        setStockProblems(`${error.message} Return to cart and adjust it.`);
      } else {
        setError('root', {
          message:
            'The order could not be placed. Nothing was saved. Try again.',
        });
      }
    }
  };

  if (pieces.loading || pieces.error || orders.loading || orders.error) {
    return (
      <>
        <PageHeader
          title="Checkout"
          description="Place your order as a guest. No online payment is taken."
        />
        <PageState
          loading={pieces.loading || orders.loading}
          loadingText="Loading checkout."
          errorText={
            pieces.error || orders.error
              ? 'Checkout could not be loaded.'
              : undefined
          }
          onRetry={() => {
            pieces.retry();
            orders.retry();
          }}
        />
      </>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        <PageHeader
          title="Checkout"
          description="Place your order as a guest. No online payment is taken."
        />
        <div className="flex-col-gap-3 items-start">
          <Paragraph role="status">Your cart is empty.</Paragraph>
          <Button as={NextLink} href="/shop">
            Browse pieces
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Checkout"
        description="Place your order as a guest. No online payment is taken."
      />
      <div className="grid gap-6 grid-cols-2 items-start">
          <Form
            onSubmit={handleSubmit(submit)}
            error={errors.root?.message}
            actions={
              <>
                <Button
                  // Going back to the cart is the quiet way out beside ordering.
                  variant="base"
                  as={NextLink}
                  href="/cart"
                >
                  Back to cart
                </Button>
                <Button
                  type="submit"
                  loadingWithReason={isSubmitting ? 'Placing your order' : undefined}
                >
                  Place order
                </Button>
              </>
            }
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Enter your name' }}
            >
              {({ field }) => (
                <Input label="Name" autoComplete="name" {...field} />
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
            <Controller
              name="fulfilmentChoice"
              control={control}
              rules={{ required: 'Choose studio pickup or courier delivery' }}
            >
              {({ field }) => (
                <RadioGroup
                  label="Fulfilment choice"
                  {...field}
                  className="flex-col-gap-2"
                >
                  <Radio value="studio_pickup">Studio pickup</Radio>
                  <Radio value="courier_delivery">Courier delivery</Radio>
                </RadioGroup>
              )}
            </Controller>
            {choice === 'courier_delivery' ? (
              <>
                <Controller
                  name="deliveryAddress"
                  control={control}
                  rules={{
                    validate: (address) =>
                      choice !== 'courier_delivery' ||
                      address.trim() !== '' ||
                      'Enter the delivery address',
                  }}
                >
                  {({ field }) => (
                    <Input
                      label="Delivery address"
                      autoComplete="street-address"
                      {...field}
                    />
                  )}
                </Controller>
                <Controller
                  name="city"
                  control={control}
                  rules={{
                    validate: (city) =>
                      choice !== 'courier_delivery' ||
                      city.trim() !== '' ||
                      'Enter the city',
                  }}
                >
                  {({ field }) => (
                    <Input
                      label="City"
                      autoComplete="address-level2"
                      {...field}
                    />
                  )}
                </Controller>
                <Controller
                  name="pinCode"
                  control={control}
                  rules={{
                    validate: (pin) => {
                      if (choice !== 'courier_delivery') return true;
                      if (pin.trim() === '') return 'Enter the PIN code';
                      return (
                        isValidPinCode(pin) ||
                        'Enter the 6-digit PIN code'
                      );
                    },
                  }}
                >
                  {({ field }) => (
                    <Input
                      label="PIN code"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      {...field}
                    />
                  )}
                </Controller>
              </>
            ) : null}
            <Controller name="discountCode" control={control}>
              {({ field }) => (
                <Input
                  label="Discount code"
                  autoComplete="off"
                  placeholder="Optional"
                  {...field}
                  action={
                    <Button
                      // Applying the code is the quiet step beside the field.
                      variant="base"
                      onClick={applyDiscount}
                    >
                      Apply
                    </Button>
                  }
                />
              )}
            </Controller>
            {appliedCode !== '' ? (
              usableCode ? (
                <Paragraph color="success" role="status">
                  {usableCode.code} applied:{' '}
                  {usableCode.discountType === 'percentage'
                    ? `${usableCode.discountValue}% off`
                    : `${usableCode.discountValue} off`}.
                </Paragraph>
              ) : codeInvalid ? (
                <Paragraph color="error" role="alert">
                  That code is invalid, expired or deactivated. Correct it or
                  place the order without it.
                </Paragraph>
              ) : null
            ) : null}
            {stockProblems ? (
              <div className="flex-col-gap-2 items-start">
                <Paragraph color="error" role="alert">
                  {stockProblems}
                </Paragraph>
                <Button
                  // Returning to the cart is the way out when stock fell short.
                  variant="base"
                  as={NextLink}
                  href="/cart"
                >
                  Return to cart
                </Button>
              </div>
            ) : null}
          </Form>
          <div className="flex-col-gap-4">
            <OrderItems
              items={lines.map((line) => ({
                key: `${line.pieceId}|${line.glaze}|${line.size}`,
                title: line.title,
                glaze: line.glaze,
                size: line.size,
                quantity: line.quantity,
                price: line.price,
              }))}
            />
            <OrderTotals
              subtotal={subtotal}
              discountAmount={discount}
              shippingCost={shipping}
              total={total}
            />
            <Paragraph color="muted">
              Courier delivery is ₹99, free when your discounted subtotal is
              above ₹1,500. Studio pickup is free.
            </Paragraph>
            {choice === 'studio_pickup' ? (
              <PickupInfo />
            ) : (
              <Paragraph color="muted">
                No online payment is taken. The owner will collect payment by
                UPI after you place your order.
              </Paragraph>
            )}
          </div>
      </div>
    </>
  );
}
