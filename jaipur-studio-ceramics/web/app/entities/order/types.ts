import type { FulfilmentChoice, FulfilmentStatus, PaymentStatus } from '../enums';

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  buyerName: string;
  phoneNumber: string;
  fulfilmentChoice: FulfilmentChoice;
  deliveryAddress?: string;
  city?: string;
  pinCode?: string;
  quantity: number[];
  orderReference: string;
  pieces: string[];
  fulfilmentStatus: FulfilmentStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discountTotal?: number;
  shippingTotal: number;
  total: number;
  discountCode?: string;
  orderedPieceName: string[];
  orderedGlaze: string[];
  orderedSize: string[];
  orderedPrice: number[];
};

/** What a create takes: everything but the fields the store sets. */
export type OrderInput = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>;
