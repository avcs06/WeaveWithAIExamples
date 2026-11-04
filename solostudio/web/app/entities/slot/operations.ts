import { mockCall, type Read, useRead } from '../mock';

import { useSlotStore } from './store';

import type { Slot } from './types';

export async function listSlots(): Promise<Slot[]> {
  await mockCall('listSlots');
  return useSlotStore.getState().records;
}

export function useListSlots(): Read<Slot[]> {
  return useRead('listSlots', useSlotStore('records'));
}

export async function getSlot(id: string): Promise<Slot | undefined> {
  await mockCall('getSlot');
  return useSlotStore.getState().records.find((record) => record.id === id);
}

export function useGetSlot(id: string): Read<Slot | undefined> {
  return useRead('getSlot', useSlotStore(({ records }) => records.find((record) => record.id === id)));
}

export async function deleteSlot(id: string): Promise<void> {
  await mockCall('deleteSlot');
  useSlotStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}
