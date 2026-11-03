import type { DiscountCodeStatus, DiscountType } from '../enums';

export type DiscountCode = {
  id: string;
  createdAt: string;
  updatedAt: string;
  discountCode?: string;
  discountType: DiscountType;
  discountValue: number;
  expiryDate: string;
  status: DiscountCodeStatus;
};

/** What a create takes: everything but the fields the store sets. */
export type DiscountCodeInput = Omit<DiscountCode, 'id' | 'createdAt' | 'updatedAt'>;
