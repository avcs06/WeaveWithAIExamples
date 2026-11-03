'use client';

// Loads its records through listPieces and getDiscountCode.
import {
  COURIER_FEE,
  FREE_SHIPPING_ABOVE,
  cartTotals,
  usableDiscount,
} from '@app/blocks/cartTotals';
import { formatINR } from '@app/blocks/money';
import {
  STUDIO_PICKUP_ADDRESS,
  STUDIO_PICKUP_INSTRUCTIONS,
} from '@app/blocks/shopInfo';
import { stockAfterOrderLines, stockFor } from '@app/blocks/stock';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { clearCart, useCartLines } from '@app/entities/cart';
import { getDiscountCode } from '@app/entities/discountCode';
import { FulfilmentChoiceOptions } from '@app/entities/enums';
import { createOrder, useListOrders } from '@app/entities/order';
import { updatePiece, useListPieces } from '@app/entities/piece';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { Input } from '@packages/ui/Input';
import { Numeral } from '@packages/ui/Numeral';
import { Radio, RadioGroup } from '@packages/ui/Radio';
import {
  Caption,
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  List,
  ListItem,
  Paragraph,
} from '@packages/ui/Typography';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { DiscountCode } from '@app/entities/discountCode';
import type { FulfilmentChoice } from '@app/entities/enums';
import type { OrderInput } from '@app/entities/order';

type CheckoutValues = {
  buyerName: string;
  phoneNumber: string;
  fulfilmentChoice: string;
  deliveryAddress: string;
  city: string;
  pinCode: string;
};

const emptyCheckout: CheckoutValues = {
  buyerName: '',
  phoneNumber: '',
  fulfilmentChoice: '',
  deliveryAddress: '',
  city: '',
  pinCode: '',
};

const phoneOk = (value: string): boolean =>
  value.replace(/\D/g, '').length >= 10;

const todayIso = (): string => new Date().toISOString().slice(0, 10);

const nextReference = (references: string[]): string => {
  const max = references.reduce((top, reference) => {
    const match = /(\d+)\s*$/.exec(reference);
    return match ? Math.max(top, Number(match[1])) : top;
  }, 1023);
  return `JSC-${max + 1}`;
};

export default function CheckoutPage() {
  const router = useRouter();
  const {
    data: pieces,
    loading: piecesLoading,
    error: piecesError,
    retry: retryPieces,
  } = useListPieces();
  const { data: orders } = useListOrders();
  const lines = useCartLines();
  const {
    control: discountControl,
    handleSubmit: handleDiscountSubmit,
  } = useForm<{ discountCode: string }>({
    defaultValues: { discountCode: '' },
  });
  const [applied, setApplied] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [checkingCode, setCheckingCode] = useState(false);
  const [shorts, setShorts] = useState<
    { name: string; glaze: string; size: string; stock: number }[]
  >([]);

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ defaultValues: emptyCheckout });
  const fulfilmentChoice = watch('fulfilmentChoice');
  const isCourier = fulfilmentChoice === 'courier_delivery';

  if (piecesLoading) {
    return <LoadingView title="Checkout" message="Loading your cart…" />;
  }

  if (piecesError) {
    return (
      <LoadFailedView
        title="Checkout"
        message="Something went wrong while loading the pieces."
        onRetry={retryPieces}
      />
    );
  }

  const all = pieces ?? [];

  if (lines.length === 0) {
    return (
      <>
        <PageHeader title="Checkout" />
        <div className="flex-col-gap-4 items-start">
          <Paragraph>
            Your cart is empty. Browse pieces to start your order.
          </Paragraph>
          <Button as={NextLink} href="/pieces">
            Browse pieces
          </Button>
        </div>
      </>
    );
  }

  const detailed = lines.map((line) => ({
    line,
    piece: all.find((entry) => entry.id === line.pieceId),
  }));
  const priced = detailed.map(({ line, piece }) => ({
    quantity: line.quantity,
    unitPrice: piece?.price ?? 0,
  }));
  const choice: FulfilmentChoice =
    fulfilmentChoice === 'courier_delivery' ||
    fulfilmentChoice === 'studio_pickup'
      ? fulfilmentChoice
      : 'studio_pickup';
  const totals = cartTotals(priced, choice, applied);

  const applyCode = async ({ discountCode }: { discountCode: string }) => {
    const code = discountCode.trim();
    if (!code || checkingCode) return;
    setCheckingCode(true);
    try {
      const found = await getDiscountCode(code);
      if (!found) {
        setApplied(null);
        setDiscountError('That code is not recognized.');
      } else if (found.expiryDate < todayIso()) {
        setApplied(null);
        setDiscountError('That code has expired.');
      } else if (found.status !== 'active') {
        setApplied(null);
        setDiscountError('That code is no longer active.');
      } else {
        setApplied(found);
        setDiscountError(null);
      }
    } catch {
      setDiscountError('Could not check the code. Try applying it again.');
    } finally {
      setCheckingCode(false);
    }
  };

  const place = async (values: CheckoutValues) => {
    const missing = detailed
      .map(({ line, piece }) => ({
        name: piece?.name ?? 'A piece that is no longer available',
        glaze: line.glaze,
        size: line.size,
        stock: piece ? (stockFor(piece, line.glaze, line.size) ?? 0) : 0,
        quantity: line.quantity,
      }))
      .filter((entry) => entry.quantity > entry.stock);
    if (missing.length > 0) {
      setShorts(missing);
      return;
    }
    setShorts([]);

    let discount = applied;
    if (discount && !usableDiscount(discount)) {
      discount = null;
      setApplied(null);
      setDiscountError('That code cannot be used.');
      return;
    }

    const finalTotals = cartTotals(
      priced,
      values.fulfilmentChoice as FulfilmentChoice,
      discount,
    );
    const input: OrderInput = {
      buyerName: values.buyerName.trim(),
      phoneNumber: values.phoneNumber.trim(),
      fulfilmentChoice: values.fulfilmentChoice as FulfilmentChoice,
      ...(values.fulfilmentChoice === 'courier_delivery'
        ? {
            deliveryAddress: values.deliveryAddress.trim(),
            city: values.city.trim(),
            pinCode: values.pinCode.trim(),
          }
        : {}),
      quantity: lines.map((line) => line.quantity),
      orderReference: nextReference(
        (orders ?? []).map((order) => order.orderReference),
      ),
      pieces: lines.map((line) => line.pieceId),
      fulfilmentStatus: 'new',
      paymentStatus: 'unpaid',
      subtotal: finalTotals.subtotal,
      discountTotal: finalTotals.discountTotal,
      shippingTotal: finalTotals.shippingTotal,
      total: finalTotals.total,
      ...(discount ? { discountCode: discount.id } : {}),
      orderedPieceName: detailed.map(
        ({ line, piece }) => piece?.name ?? line.pieceId,
      ),
      orderedGlaze: lines.map((line) => line.glaze),
      orderedSize: lines.map((line) => line.size),
      orderedPrice: detailed.map(({ piece }) => piece?.price ?? 0),
    };

    try {
      const order = await createOrder(input);
      const byPiece = new Map<string, typeof lines>();
      for (const line of lines) {
        byPiece.set(line.pieceId, [...(byPiece.get(line.pieceId) ?? []), line]);
      }
      for (const [pieceId, pieceLines] of byPiece) {
        const piece = all.find((entry) => entry.id === pieceId);
        if (piece) {
          await updatePiece(pieceId, {
            variantStockQuantity: stockAfterOrderLines(
              piece,
              pieceLines,
              -1,
            ),
          });
        }
      }
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch {
      setError('root.place', {
        message: 'Could not place the order. Try placing it again.',
      });
    }
  };

  return (
    <>
      <PageHeader title="Checkout" />
      <div className="flex-row-gap-6 flex-wrap items-start">
        <div className="flex-col-gap-6 flex-1">
          {shorts.length > 0 ? (
            <div className="flex-col-gap-2 items-start">
              {shorts.map((entry) => (
                <Paragraph key={`${entry.name}-${entry.glaze}-${entry.size}`}>
                  Only {entry.stock} left for {entry.name} in {entry.glaze},{' '}
                  {entry.size}.
                </Paragraph>
              ))}
              <Button
                variant="base" // Quiet way back to fix quantities.
                as={NextLink}
                href="/cart"
              >
                Open cart
              </Button>
            </div>
          ) : null}
          <Form onSubmit={handleDiscountSubmit(applyCode)}>
            <Controller name="discountCode" control={discountControl}>
              {({ field }) => (
                <Input
                  label="Discount code"
                  autoComplete="off"
                  {...field}
                  onChange={(next) => {
                    field.onChange(next);
                    setDiscountError(null);
                  }}
                  error={discountError ?? undefined}
                  success={
                    applied && !discountError
                      ? `Applied ${applied.discountCode ?? 'code'}.`
                      : undefined
                  }
                  action={
                    <Button
                      type="submit"
                      loadingWithReason={
                        checkingCode ? 'Checking the code' : undefined
                      }
                    >
                      Apply
                    </Button>
                  }
                />
              )}
            </Controller>
          </Form>
          <Form
            onSubmit={handleSubmit(place)}
            error={errors.root?.place?.message}
            actions={
              <>
                <NextLink look="plain" href="/cart">
                  Open cart
                </NextLink>
                <Button
                  type="submit"
                  loadingWithReason={
                    isSubmitting ? 'Placing the order' : undefined
                  }
                >
                  Place order
                </Button>
              </>
            }
          >
            <Controller
              name="buyerName"
              control={control}
              rules={{ required: 'Enter your name' }}
            >
              {({ field }) => (
                <Input label="Buyer name" autoComplete="name" {...field} />
              )}
            </Controller>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: 'Enter your phone number',
                validate: (value) =>
                  phoneOk(value) ||
                  'Enter a phone number with at least 10 digits.',
              }}
            >
              {({ field }) => (
                <Input label="Phone number" autoComplete="tel" {...field} />
              )}
            </Controller>
            <Controller
              name="fulfilmentChoice"
              control={control}
              rules={{ required: 'Choose studio pickup or courier delivery' }}
            >
              {({ field }) => (
                <RadioGroup
                  label="Fulfilment"
                  {...field}
                  onChange={(next) => {
                    field.onChange(next);
                    if (next !== 'courier_delivery') {
                      clearErrors(['deliveryAddress', 'city', 'pinCode']);
                    }
                  }}
                  className="flex-col-gap-2"
                >
                  {FulfilmentChoiceOptions.map((option) => (
                    <Radio key={option.key} value={option.key}>
                      {option.label}
                    </Radio>
                  ))}
                </RadioGroup>
              )}
            </Controller>
            {isCourier ? (
              <>
                <Controller
                  name="deliveryAddress"
                  control={control}
                  rules={{
                    validate: (value) =>
                      !isCourier ||
                      value.trim().length > 0 ||
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
                    validate: (value) =>
                      !isCourier ||
                      value.trim().length > 0 ||
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
                    validate: (value) =>
                      !isCourier ||
                      value.trim().length > 0 ||
                      'Enter the PIN code',
                  }}
                >
                  {({ field }) => (
                    <Input
                      label="PIN code"
                      autoComplete="postal-code"
                      {...field}
                    />
                  )}
                </Controller>
              </>
            ) : null}
          </Form>
        </div>
        <div className="flex-col-gap-4">
          <List aria-label="Order lines">
            {detailed.map(({ line, piece }, at) => (
              <ListItem key={`${line.pieceId}-${line.glaze}-${line.size}-${at}`}>
                {line.quantity} × {piece?.name ?? line.pieceId} in{' '}
                {line.glaze}, {line.size} ·{' '}
                <Numeral>
                  {formatINR((piece?.price ?? 0) * line.quantity)}
                </Numeral>
              </ListItem>
            ))}
          </List>
          <DescriptionList>
            <div>
              <DescriptionTerm>Subtotal</DescriptionTerm>
              <DescriptionDetails>
                <Numeral>{formatINR(totals.subtotal)}</Numeral>
              </DescriptionDetails>
            </div>
            {totals.discountTotal > 0 ? (
              <div>
                <DescriptionTerm>Discount</DescriptionTerm>
                <DescriptionDetails>
                  <Numeral>{`−${formatINR(totals.discountTotal)}`}</Numeral>
                </DescriptionDetails>
              </div>
            ) : null}
            <div>
              <DescriptionTerm>Shipping</DescriptionTerm>
              <DescriptionDetails>
                {totals.shippingTotal === 0 ? (
                  'Free'
                ) : (
                  <Numeral>{formatINR(totals.shippingTotal)}</Numeral>
                )}
              </DescriptionDetails>
            </div>
            <div>
              <DescriptionTerm>Total</DescriptionTerm>
              <DescriptionDetails>
                <Numeral>{formatINR(totals.total)}</Numeral>
              </DescriptionDetails>
            </div>
          </DescriptionList>
          <Paragraph>
            Courier delivery is {formatINR(COURIER_FEE)}, free when the
            discounted subtotal is more than {formatINR(FREE_SHIPPING_ABOVE)}.
            Studio pickup is free.
          </Paragraph>
          <Paragraph>
            Pickup from {STUDIO_PICKUP_ADDRESS}. {STUDIO_PICKUP_INSTRUCTIONS}
          </Paragraph>
          <Caption>No online payment is taken at checkout.</Caption>
        </div>
      </div>
    </>
  );
}
