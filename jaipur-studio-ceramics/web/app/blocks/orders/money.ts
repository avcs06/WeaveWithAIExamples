import type { DiscountCode } from '@app/entities/discountCode';
import type { FulfilmentChoice } from '@app/entities/enums';

/** Money shows with no decimals everywhere in this shop. */
export const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** Today as a day string, so dates compare as dates. */
export const todayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export function isCodeUsable(code: DiscountCode): boolean {
  return code.status === 'active' && code.expiryDate >= todayKey();
}

/** The discount a usable code takes off the subtotal, capped at the subtotal. */
export function discountFor(
  subtotal: number,
  code: DiscountCode | undefined,
): number {
  if (!code || !isCodeUsable(code)) return 0;
  const amount =
    code.discountType === 'percentage'
      ? (subtotal * code.discountValue) / 100
      : code.discountValue;
  // Rounded once, so the shown total equals shown subtotal minus shown
  // discount plus shown shipping.
  return Math.round(Math.min(Math.max(amount, 0), subtotal));
}

/**
 * Courier is ₹99, free when the discounted subtotal is above ₹1,500;
 * studio pickup is always free.
 */
export function shippingFor(
  discountedSubtotal: number,
  choice: FulfilmentChoice | '',
): number {
  if (choice === 'courier_delivery')
    return discountedSubtotal > 1500 ? 0 : 99;
  return 0;
}

/** The next free order reference, after the highest one in use. */
export function nextOrderReference(existing: string[]): string {
  const used = new Set(existing);
  let number = 4821;
  for (const reference of existing) {
    const match = /^JSC-(\d+)$/.exec(reference);
    if (match) number = Math.max(number, Number(match[1]) + 1);
  }
  while (used.has(`JSC-${number}`)) number += 1;
  return `JSC-${number}`;
}

const INDIAN_PHONE = /^(\+?91|0)?[6-9]\d{9}$/;

export function isValidIndianPhone(phone: string): boolean {
  return INDIAN_PHONE.test(phone.replace(/[\s-]/g, ''));
}

export function isValidPinCode(pinCode: string): boolean {
  return /^\d{6}$/.test(pinCode.trim());
}
