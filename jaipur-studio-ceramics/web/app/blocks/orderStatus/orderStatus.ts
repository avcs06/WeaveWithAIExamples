import {
  FulfilmentStatusOptions,
  PaymentStatusOptions,
} from '@app/entities/enums';

/** The display label for a fulfilment status key. */
export function fulfilmentLabel(status: string): string {
  return (
    FulfilmentStatusOptions.find((option) => option.key === status)?.label ??
    status
  );
}

/** The display label for a payment status key. */
export function paymentLabel(status: string): string {
  return (
    PaymentStatusOptions.find((option) => option.key === status)?.label ??
    status
  );
}

/** The tag tone for a fulfilment status key. */
export function fulfilmentTone(
  status: string,
): 'info' | 'warning' | 'success' | 'error' {
  switch (status) {
    case 'new':
      return 'info';
    case 'packed':
      return 'warning';
    case 'shipped':
    case 'picked_up':
      return 'success';
    default:
      return 'error';
  }
}

/** The tag tone for a payment status key. */
export function paymentTone(status: string): 'success' | 'warning' {
  return status === 'paid' ? 'success' : 'warning';
}
