import { mockCall, type Read, useRead } from '../mock';

import { useDashboardStore } from './store';

import type { Dashboard, DashboardInput } from './types';

export async function listDashboards(): Promise<Dashboard[]> {
  await mockCall('listDashboards');
  return useDashboardStore.getState().records;
}

export function useListDashboards(): Read<Dashboard[]> {
  return useRead('listDashboards', useDashboardStore('records'));
}

export async function getDashboard(id: string): Promise<Dashboard | undefined> {
  await mockCall('getDashboard');
  return useDashboardStore.getState().records.find((record) => record.id === id);
}

export function useGetDashboard(id: string): Read<Dashboard | undefined> {
  return useRead('getDashboard', useDashboardStore(({ records }) => records.find((record) => record.id === id)));
}

export async function createDashboard(input: DashboardInput): Promise<Dashboard> {
  await mockCall('createDashboard');
  const now = new Date().toISOString();
  const record: Dashboard = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useDashboardStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function duplicateDashboard(input: DashboardInput): Promise<Dashboard> {
  await mockCall('duplicateDashboard');
  const now = new Date().toISOString();
  const record: Dashboard = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useDashboardStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function updateDashboard(id: string, changes: Partial<DashboardInput>): Promise<Dashboard> {
  await mockCall('updateDashboard');
  const current = useDashboardStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Dashboard not found');
  const record: Dashboard = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useDashboardStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function deleteDashboard(id: string): Promise<void> {
  await mockCall('deleteDashboard');
  useDashboardStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}

export async function touchDashboard(id: string, changes: Partial<DashboardInput>): Promise<Dashboard> {
  await mockCall('touchDashboard');
  const current = useDashboardStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Dashboard not found');
  const record: Dashboard = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useDashboardStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}
