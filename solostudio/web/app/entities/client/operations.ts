import { mockCall, type Read, useRead } from '../mock';

import { useClientStore } from './store';

import type { Client, ClientInput } from './types';

export async function listClients(): Promise<Client[]> {
  await mockCall('listClients');
  return useClientStore.getState().records;
}

export function useListClients(): Read<Client[]> {
  return useRead('listClients', useClientStore('records'));
}

export async function getClient(email: Client['email']): Promise<Client | undefined> {
  await mockCall('getClient');
  // Client pages read by id, while the booking flow matches by email: both find the client.
  return useClientStore
    .getState()
    .records.find((record) => record.id === email || record.email === email);
}

export function useGetClient(email: Client['email']): Read<Client | undefined> {
  return useRead(
    'getClient',
    useClientStore(({ records }) => records.find((record) => record.id === email || record.email === email)),
  );
}

export async function createClient(input: ClientInput): Promise<Client> {
  await mockCall('createClient');
  const now = new Date().toISOString();
  const record: Client = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useClientStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function updateClient(id: string, changes: Partial<ClientInput>): Promise<Client> {
  await mockCall('updateClient');
  const current = useClientStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Client not found');
  const record: Client = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useClientStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function deleteClient(id: string): Promise<void> {
  await mockCall('deleteClient');
  useClientStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}
