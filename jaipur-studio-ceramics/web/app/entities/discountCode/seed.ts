import type { DiscountCode } from './types';

export const discountCodeSeed: DiscountCode[] = [
  {
    "id": "discountCode-1",
    "createdAt": "2026-10-24T11:54:11.023Z",
    "updatedAt": "2026-10-24T12:54:11.023Z",
    "discountCode": "WEEKEND10",
    "discountType": "percentage",
    "discountValue": 10,
    "expiryDate": "2026-11-15",
    "status": "active"
  },
  {
    "id": "discountCode-2",
    "createdAt": "2026-10-26T11:54:11.023Z",
    "updatedAt": "2026-10-26T13:54:11.023Z",
    "discountCode": "DIWALI200",
    "discountType": "fixed_amount",
    "discountValue": 200,
    "expiryDate": "2026-11-10",
    "status": "active"
  },
  {
    "id": "discountCode-3",
    "createdAt": "2026-10-28T11:54:11.023Z",
    "updatedAt": "2026-10-28T14:54:11.023Z",
    "discountCode": "STUDIOPICKUP5",
    "discountType": "percentage",
    "discountValue": 5,
    "expiryDate": "2026-12-10",
    "status": "active"
  },
  {
    "id": "discountCode-4",
    "createdAt": "2026-10-30T11:54:11.023Z",
    "updatedAt": "2026-10-30T15:54:11.023Z",
    "discountCode": "WELCOME100",
    "discountType": "fixed_amount",
    "discountValue": 100,
    "expiryDate": "2026-10-20",
    "status": "deactivated"
  },
  {
    "id": "discountCode-5",
    "createdAt": "2026-11-01T11:54:11.023Z",
    "updatedAt": "2026-11-01T16:54:11.023Z",
    "discountCode": "MONSOON15",
    "discountType": "percentage",
    "discountValue": 15,
    "expiryDate": "2026-10-25",
    "status": "deactivated"
  }
];
