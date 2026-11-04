import { mockCall, type Read, useRead } from '../mock';

import { useAvailabilityStore } from './store';

import type { Availability, AvailabilityInput } from './types';

export async function createAvailability(input: AvailabilityInput): Promise<Availability> {
  await mockCall('createAvailability');
  const now = new Date().toISOString();
  const record: Availability = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useAvailabilityStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function getAvailability(id: string): Promise<Availability | undefined> {
  await mockCall('getAvailability');
  return useAvailabilityStore.getState().records.find((record) => record.id === id);
}

export function useGetAvailability(id: string): Read<Availability | undefined> {
  return useRead('getAvailability', useAvailabilityStore(({ records }) => records.find((record) => record.id === id)));
}

export async function listAvailabilities(): Promise<Availability[]> {
  await mockCall('listAvailabilities');
  return useAvailabilityStore.getState().records;
}

export function useListAvailabilities(): Read<Availability[]> {
  return useRead('listAvailabilities', useAvailabilityStore('records'));
}

export async function deleteAvailability(id: string): Promise<void> {
  await mockCall('deleteAvailability');
  useAvailabilityStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}

export async function updateAvailability(id: string, changes: Partial<AvailabilityInput>): Promise<Availability> {
  await mockCall('updateAvailability');
  const current = useAvailabilityStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Availability not found');
  const record: Availability = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useAvailabilityStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}
