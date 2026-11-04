import { mockCall, type Read, useRead } from '../mock';

import { useTaskStore } from './store';

import type { Task, TaskInput } from './types';

export async function listTasks(): Promise<Task[]> {
  await mockCall('listTasks');
  return useTaskStore.getState().records;
}

export function useListTasks(): Read<Task[]> {
  return useRead('listTasks', useTaskStore('records'));
}

export async function getTask(id: string): Promise<Task | undefined> {
  await mockCall('getTask');
  return useTaskStore.getState().records.find((record) => record.id === id);
}

export function useGetTask(id: string): Read<Task | undefined> {
  return useRead('getTask', useTaskStore(({ records }) => records.find((record) => record.id === id)));
}

export async function createTask(input: TaskInput): Promise<Task> {
  await mockCall('createTask');
  const now = new Date().toISOString();
  const record: Task = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useTaskStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function updateTask(id: string, changes: Partial<TaskInput>): Promise<Task> {
  await mockCall('updateTask');
  const current = useTaskStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Task not found');
  const record: Task = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useTaskStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function completeTask(id: string, changes: Partial<TaskInput>): Promise<Task> {
  await mockCall('completeTask');
  const current = useTaskStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Task not found');
  const record: Task = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useTaskStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function deleteTask(id: string): Promise<void> {
  await mockCall('deleteTask');
  useTaskStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}
