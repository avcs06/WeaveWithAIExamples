import type { DiscountCode } from './types';

export const discountCodeSeed: DiscountCode[] = [
  {
    "id": "discountCode-1",
    "createdAt": "2026-10-24T19:43:11.773Z",
    "updatedAt": "2026-10-24T20:43:11.773Z",
    "code": "WEEKEND10",
    "discountType": "percentage",
    "discountValue": 10,
    "expiryDate": "2026-11-15",
    "status": "active"
  },
  {
    "id": "discountCode-2",
    "createdAt": "2026-10-26T19:43:11.773Z",
    "updatedAt": "2026-10-26T21:43:11.773Z",
    "code": "DIWALI200",
    "discountType": "fixed_amount",
    "discountValue": 200,
    "expiryDate": "2026-11-10",
    "status": "active"
  },
  {
    "id": "discountCode-3",
    "createdAt": "2026-10-28T19:43:11.773Z",
    "updatedAt": "2026-10-28T22:43:11.773Z",
    "code": "FIRSTBUY15",
    "discountType": "percentage",
    "discountValue": 15,
    "expiryDate": "2027-01-15",
    "status": "active"
  },
  {
    "id": "discountCode-4",
    "createdAt": "2026-10-30T19:43:11.773Z",
    "updatedAt": "2026-10-30T23:43:11.773Z",
    "code": "STUDIOPICKUP50",
    "discountType": "fixed_amount",
    "discountValue": 50,
    "expiryDate": "2026-10-20",
    "status": "deactivated"
  },
  {
    "id": "discountCode-5",
    "createdAt": "2026-11-01T19:43:11.773Z",
    "updatedAt": "2026-11-02T00:43:11.773Z",
    "code": "MONSOON20",
    "discountType": "percentage",
    "discountValue": 20,
    "expiryDate": "2026-09-30",
    "status": "deactivated"
  }
];
