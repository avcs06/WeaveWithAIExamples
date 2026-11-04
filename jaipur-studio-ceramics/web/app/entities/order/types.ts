import type { FulfilmentChoice, FulfilmentStatus, PaymentStatus, Size } from '../enums';

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  phoneNumber: string;
  fulfilmentChoice: FulfilmentChoice;
  deliveryAddress?: string;
  city?: string;
  pinCode?: string;
  discountCode?: string;
  orderReference: string;
  itemPieceId: string[];
  quantity: number[];
  itemTitle: string[];
  itemGlaze: string[];
  itemSize: Size[];
  itemPrice: number[];
  subtotal: number;
  discountAmount?: number;
  shippingCost: number;
  total: number;
  paymentStatus: PaymentStatus;
  fulfilmentStatus: FulfilmentStatus;
};

/** What a create takes: everything but the fields the store sets. */
export type OrderInput = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>;
