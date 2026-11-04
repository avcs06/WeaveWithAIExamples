import { mockCall, type Read, useRead } from '../mock';

import { useWidgetStore } from './store';

import type { Widget, WidgetInput } from './types';

export async function listWidgets(): Promise<Widget[]> {
  await mockCall('listWidgets');
  return useWidgetStore.getState().records;
}

export function useListWidgets(): Read<Widget[]> {
  return useRead('listWidgets', useWidgetStore('records'));
}

export async function getWidget(id: string): Promise<Widget | undefined> {
  await mockCall('getWidget');
  return useWidgetStore.getState().records.find((record) => record.id === id);
}

export function useGetWidget(id: string): Read<Widget | undefined> {
  return useRead('getWidget', useWidgetStore(({ records }) => records.find((record) => record.id === id)));
}

export async function createWidget(input: WidgetInput): Promise<Widget> {
  await mockCall('createWidget');
  const now = new Date().toISOString();
  const record: Widget = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useWidgetStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function deleteWidget(id: string): Promise<void> {
  await mockCall('deleteWidget');
  useWidgetStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}

export async function updateWidgetTitle(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('updateWidgetTitle');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function repositionWidget(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('repositionWidget');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function resizeWidget(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('resizeWidget');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function updateNoteText(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('updateNoteText');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function incrementCounter(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('incrementCounter');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function updateCounterLabel(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('updateCounterLabel');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function addChecklistItem(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('addChecklistItem');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function toggleChecklistItem(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('toggleChecklistItem');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function updateChecklistItem(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('updateChecklistItem');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function removeChecklistItem(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('removeChecklistItem');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function addLink(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('addLink');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function updateLink(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('updateLink');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function removeLink(id: string, changes: Partial<WidgetInput>): Promise<Widget> {
  await mockCall('removeLink');
  const current = useWidgetStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Widget not found');
  const record: Widget = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useWidgetStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}
