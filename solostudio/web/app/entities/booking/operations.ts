import { mockCall, type Read, useRead } from '../mock';

import { useBookingStore } from './store';

import type { Booking, BookingInput } from './types';

export async function listBookings(): Promise<Booking[]> {
  await mockCall('listBookings');
  return useBookingStore.getState().records;
}

export function useListBookings(): Read<Booking[]> {
  return useRead('listBookings', useBookingStore('records'));
}

export async function getBooking(id: string): Promise<Booking | undefined> {
  await mockCall('getBooking');
  return useBookingStore.getState().records.find((record) => record.id === id);
}

export function useGetBooking(id: string): Read<Booking | undefined> {
  return useRead('getBooking', useBookingStore(({ records }) => records.find((record) => record.id === id)));
}

export async function createBooking(input: BookingInput): Promise<Booking> {
  await mockCall('createBooking');
  const now = new Date().toISOString();
  const record: Booking = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useBookingStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function cancelBooking(id: string, changes: Partial<BookingInput>): Promise<Booking> {
  await mockCall('cancelBooking');
  const current = useBookingStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Booking not found');
  const record: Booking = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useBookingStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function deleteBooking(id: string): Promise<void> {
  await mockCall('deleteBooking');
  useBookingStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}
