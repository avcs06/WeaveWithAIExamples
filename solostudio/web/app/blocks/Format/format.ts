/**
 * Shared formatting helpers for dates, times and money. Every screen formats
 * these the same way, in UTC so the server and the browser agree.
 */

/** Today's date as `YYYY-MM-DD` in UTC. */
export function todayKey(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/** Adds whole days to a `YYYY-MM-DD` key, staying in UTC. */
export function addDaysKey(key: string, days: number): string {
  const date = new Date(`${key}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Monday of the week holding `key`, as `YYYY-MM-DD`. */
export function weekStartKey(key: string): string {
  const date = new Date(`${key}T00:00:00.000Z`);
  const mondayFirst = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - mondayFirst);
  return date.toISOString().slice(0, 10);
}

/** A slot's time as "5 Nov at 10:00", in UTC so every reader sees the same. */
export function formatSlotTime(startAt: string): string {
  const date = new Date(startAt);
  const day = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'UTC',
  }).format(date);
  return `${day} at ${time}`;
}

/** A slot's title as "Discovery call, 5 Nov at 10:00". */
export function formatSlotTitle(sessionTypeName: string, startAt: string): string {
  return `${sessionTypeName}, ${formatSlotTime(startAt)}`;
}

const wholeUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const centsUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Money one way everywhere: whole amounts without decimals, others with two. */
export function formatPrice(value: number): string {
  return Number.isInteger(value) ? wholeUsd.format(value) : centsUsd.format(value);
}
