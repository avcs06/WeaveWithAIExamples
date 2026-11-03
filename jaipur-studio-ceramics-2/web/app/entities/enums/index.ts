export const PieceCategoryOptions = [
  { key: 'mug', label: "Mug" },
  { key: 'bowl', label: "Bowl" },
  { key: 'planter', label: "Planter" },
  { key: 'vase', label: "Vase" },
] as const;

export type PieceCategory = (typeof PieceCategoryOptions)[number]['key'];

export const SizeOptions = [
  { key: 'small', label: "Small" },
  { key: 'medium', label: "Medium" },
  { key: 'large', label: "Large" },
] as const;

export type Size = (typeof SizeOptions)[number]['key'];

export const FulfilmentChoiceOptions = [
  { key: 'studio_pickup', label: "Studio pickup" },
  { key: 'courier_delivery', label: "Courier delivery" },
] as const;

export type FulfilmentChoice = (typeof FulfilmentChoiceOptions)[number]['key'];

export const DiscountTypeOptions = [
  { key: 'percentage', label: "Percentage" },
  { key: 'fixed_amount', label: "Fixed amount" },
] as const;

export type DiscountType = (typeof DiscountTypeOptions)[number]['key'];

export const PaymentStatusOptions = [
  { key: 'unpaid', label: "Unpaid" },
  { key: 'paid', label: "Paid" },
] as const;

export type PaymentStatus = (typeof PaymentStatusOptions)[number]['key'];

export const FulfilmentStatusOptions = [
  { key: 'new', label: "New" },
  { key: 'packed', label: "Packed" },
  { key: 'shipped', label: "Shipped" },
  { key: 'picked_up', label: "Picked Up" },
  { key: 'cancelled', label: "Cancelled" },
] as const;

export type FulfilmentStatus = (typeof FulfilmentStatusOptions)[number]['key'];

export const DiscountCodeStatusOptions = [
  { key: 'active', label: "Active" },
  { key: 'deactivated', label: "Deactivated" },
] as const;

export type DiscountCodeStatus = (typeof DiscountCodeStatusOptions)[number]['key'];
