import type { DiscountCode } from '@app/entities/discountCode';
import type { FulfilmentChoice } from '@app/entities/enums';

/** Courier delivery costs this much when the order does not ship free. */
export const COURIER_FEE = 99;

/** Courier delivery is free when the discounted subtotal is above this. */
export const FREE_SHIPPING_ABOVE = 1500;

export type PricedLine = {
  quantity: number;
  unitPrice: number;
};

export type CartTotals = {
  subtotal: number;
  discountTotal: number;
  discountedSubtotal: number;
  shippingTotal: number;
  total: number;
};

/** Money off from an applied code, never more than the subtotal. */
function discountFor(
  subtotal: number,
  discount: Pick<DiscountCode, 'discountType' | 'discountValue'> | null,
): number {
  if (!discount) return 0;
  const raw =
    discount.discountType === 'percentage'
      ? Math.round((subtotal * discount.discountValue) / 100)
      : discount.discountValue;
  return Math.max(0, Math.min(subtotal, raw));
}

/** Subtotal, discount, shipping and total for cart or order lines. */
export function cartTotals(
  lines: PricedLine[],
  fulfilmentChoice: FulfilmentChoice,
  discount: Pick<DiscountCode, 'discountType' | 'discountValue'> | null,
): CartTotals {
  const subtotal = lines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );
  const discountTotal = discountFor(subtotal, discount);
  const discountedSubtotal = subtotal - discountTotal;
  const shippingTotal =
    fulfilmentChoice === 'courier_delivery' &&
    discountedSubtotal <= FREE_SHIPPING_ABOVE
      ? COURIER_FEE
      : 0;
  return {
    subtotal,
    discountTotal,
    discountedSubtotal,
    shippingTotal,
    total: discountedSubtotal + shippingTotal,
  };
}

/** A code that checkout accepts: active and not past its expiry date. */
export function usableDiscount(
  code: DiscountCode | undefined,
  today = new Date().toISOString().slice(0, 10),
): DiscountCode | null {
  if (!code || code.status !== 'active') return null;
  if (code.expiryDate < today) return null;
  return code;
}
