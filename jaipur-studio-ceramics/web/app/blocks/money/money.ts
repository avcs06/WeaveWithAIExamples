const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** Money one way everywhere: whole rupee amounts with no decimals. */
export function formatINR(value: number): string {
  return inr.format(Math.round(value));
}
