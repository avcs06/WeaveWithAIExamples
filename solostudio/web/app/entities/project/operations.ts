import { mockCall, type Read, useRead } from '../mock';

import { useProjectStore } from './store';

import type { Project, ProjectInput } from './types';

export async function listProjects(): Promise<Project[]> {
  await mockCall('listProjects');
  return useProjectStore.getState().records;
}

export function useListProjects(): Read<Project[]> {
  return useRead('listProjects', useProjectStore('records'));
}

export async function getProject(id: string): Promise<Project | undefined> {
  await mockCall('getProject');
  return useProjectStore.getState().records.find((record) => record.id === id);
}

export function useGetProject(id: string): Read<Project | undefined> {
  return useRead('getProject', useProjectStore(({ records }) => records.find((record) => record.id === id)));
}

export async function createProject(input: ProjectInput): Promise<Project> {
  await mockCall('createProject');
  const now = new Date().toISOString();
  const record: Project = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useProjectStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function updateProject(id: string, changes: Partial<ProjectInput>): Promise<Project> {
  await mockCall('updateProject');
  const current = useProjectStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Project not found');
  const record: Project = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useProjectStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function deleteProject(id: string): Promise<void> {
  await mockCall('deleteProject');
  useProjectStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}
