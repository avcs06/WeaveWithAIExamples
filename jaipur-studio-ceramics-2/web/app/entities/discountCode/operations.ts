import { mockCall, type Read, useRead } from '../mock';

import { useDiscountCodeStore } from './store';

import type { DiscountCode, DiscountCodeInput } from './types';

export async function listDiscountCodes(): Promise<DiscountCode[]> {
  await mockCall('listDiscountCodes');
  return useDiscountCodeStore.getState().records;
}

export function useListDiscountCodes(): Read<DiscountCode[]> {
  return useRead('listDiscountCodes', useDiscountCodeStore('records'));
}

export async function getDiscountCode(id: string): Promise<DiscountCode | undefined> {
  await mockCall('getDiscountCode');
  return useDiscountCodeStore.getState().records.find((record) => record.id === id);
}

export function useGetDiscountCode(id: string): Read<DiscountCode | undefined> {
  return useRead('getDiscountCode', useDiscountCodeStore(({ records }) => records.find((record) => record.id === id)));
}

export async function getDiscountCodeByCode(code: DiscountCode['code']): Promise<DiscountCode | undefined> {
  await mockCall('getDiscountCodeByCode');
  return useDiscountCodeStore.getState().records.find((record) => record.code === code);
}

export function useGetDiscountCodeByCode(code: DiscountCode['code']): Read<DiscountCode | undefined> {
  return useRead('getDiscountCodeByCode', useDiscountCodeStore(({ records }) => records.find((record) => record.code === code)));
}

export async function createDiscountCode(input: DiscountCodeInput): Promise<DiscountCode> {
  await mockCall('createDiscountCode');
  const now = new Date().toISOString();
  const record: DiscountCode = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useDiscountCodeStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function deactivateDiscountCode(id: string, changes: Partial<DiscountCodeInput>): Promise<DiscountCode> {
  await mockCall('deactivateDiscountCode');
  const current = useDiscountCodeStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('DiscountCode not found');
  const record: DiscountCode = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useDiscountCodeStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}
