import { mockCall, type Read, useRead } from '../mock';

import { useSessionTypeStore } from './store';

import type { SessionType, SessionTypeInput } from './types';

export async function listSessionTypes(): Promise<SessionType[]> {
  await mockCall('listSessionTypes');
  return useSessionTypeStore.getState().records;
}

export function useListSessionTypes(): Read<SessionType[]> {
  return useRead('listSessionTypes', useSessionTypeStore('records'));
}

export async function getSessionType(id: string): Promise<SessionType | undefined> {
  await mockCall('getSessionType');
  return useSessionTypeStore.getState().records.find((record) => record.id === id);
}

export function useGetSessionType(id: string): Read<SessionType | undefined> {
  return useRead('getSessionType', useSessionTypeStore(({ records }) => records.find((record) => record.id === id)));
}

export async function createSessionType(input: SessionTypeInput): Promise<SessionType> {
  await mockCall('createSessionType');
  const now = new Date().toISOString();
  const record: SessionType = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useSessionTypeStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function updateSessionType(id: string, changes: Partial<SessionTypeInput>): Promise<SessionType> {
  await mockCall('updateSessionType');
  const current = useSessionTypeStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('SessionType not found');
  const record: SessionType = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useSessionTypeStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}
