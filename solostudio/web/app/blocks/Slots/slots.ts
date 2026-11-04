/**
 * Shared slot, booking and follow-up helpers. Every screen derives these
 * values while rendering, never from state synced by an effect.
 */
import type { Booking } from '@app/entities/booking';
import type { Note } from '@app/entities/note';
import type { SessionType } from '@app/entities/sessionType';
import type { Slot } from '@app/entities/slot';

/** A slot's bookings that still hold their seat. */
export function bookingsForSlot(bookings: Booking[], slotId: string): Booking[] {
  return bookings.filter((booking) => booking.slot === slotId && !booking.isCancelled);
}

/** Whether a slot holds as many bookings as its session type allows. */
function isSlotFull(
  slot: Slot,
  sessionType: SessionType | undefined,
  bookings: Booking[],
): boolean {
  return bookingsForSlot(bookings, slot.id).length >= (sessionType?.maximumPeople ?? 1);
}

/** A slot's booked time range, from its session type's duration. */
function slotRange(slot: Slot, durationInMinutes: number): [number, number] {
  const start = new Date(slot.startAt).getTime();
  return [start, start + durationInMinutes * 60_000];
}

/**
 * One session type's open slots for the next two weeks: not full, and not
 * overlapping a booked time, since a booked time blocks overlapping slots
 * for every other session type. Sorted earliest first.
 */
export function openSlotsFor(
  slots: Slot[],
  bookings: Booking[],
  sessionTypes: SessionType[],
  sessionTypeId: string,
  now: number = Date.now(),
): Slot[] {
  const horizon = now + 14 * 24 * 60 * 60 * 1000;
  const durationOf = (slot: Slot) =>
    sessionTypes.find((type) => type.id === slot.sessionType)?.durationInMinutes ?? 0;
  const booked = (slot: Slot) => bookingsForSlot(bookings, slot.id).length > 0;
  return slots
    .filter((slot) => {
      if (slot.sessionType !== sessionTypeId) return false;
      const start = new Date(slot.startAt).getTime();
      if (Number.isNaN(start) || start < now || start > horizon) return false;
      const sessionType = sessionTypes.find((type) => type.id === slot.sessionType);
      if (isSlotFull(slot, sessionType, bookings)) return false;
      const [from, to] = slotRange(slot, durationOf(slot));
      return !slots.some((other) => {
        if (other.id === slot.id || !booked(other)) return false;
        const [otherFrom, otherTo] = slotRange(other, durationOf(other));
        return from < otherTo && otherFrom < to;
      });
    })
    .sort((a, b) => (a.startAt < b.startAt ? -1 : a.startAt > b.startAt ? 1 : 0));
}

/**
 * The follow-up a client list shows: the client's most urgent dated note,
 * so an overdue follow-up always stands out first.
 */
export function followUpNoteFor(notes: Note[], clientId: string): Note | undefined {
  const dated = notes.filter((note) => note.client === clientId && note.followUpDate);
  dated.sort((a, b) => (a.followUpDate! < b.followUpDate! ? -1 : a.followUpDate! > b.followUpDate! ? 1 : 0));
  return dated[0];
}

/** Whether a task stands out as overdue: due before today and not done. */
export function isTaskOverdue(
  task: { dueDate?: string; status: string },
  today: string,
): boolean {
  return Boolean(task.dueDate) && task.dueDate! < today && task.status !== 'done';
}
