import { mockCall, type Read, useRead } from '../mock';

import { useOrderStore } from './store';

import type { Order, OrderInput } from './types';

export async function listOrders(): Promise<Order[]> {
  await mockCall('listOrders');
  return useOrderStore.getState().records;
}

export function useListOrders(): Read<Order[]> {
  return useRead('listOrders', useOrderStore('records'));
}

export async function getOrder(id: string): Promise<Order | undefined> {
  await mockCall('getOrder');
  return useOrderStore.getState().records.find((record) => record.id === id);
}

export function useGetOrder(id: string): Read<Order | undefined> {
  return useRead('getOrder', useOrderStore(({ records }) => records.find((record) => record.id === id)));
}

export async function lookupOrder(orderReference: Order['orderReference']): Promise<Order | undefined> {
  await mockCall('lookupOrder');
  return useOrderStore.getState().records.find((record) => record.orderReference === orderReference);
}

export function useLookupOrder(orderReference: Order['orderReference']): Read<Order | undefined> {
  return useRead('lookupOrder', useOrderStore(({ records }) => records.find((record) => record.orderReference === orderReference)));
}

export async function createOrder(input: OrderInput): Promise<Order> {
  await mockCall('createOrder');
  const now = new Date().toISOString();
  const record: Order = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useOrderStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function markOrderPacked(id: string, changes: Partial<OrderInput>): Promise<Order> {
  await mockCall('markOrderPacked');
  const current = useOrderStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Order not found');
  const record: Order = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useOrderStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function markOrderShipped(id: string, changes: Partial<OrderInput>): Promise<Order> {
  await mockCall('markOrderShipped');
  const current = useOrderStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Order not found');
  const record: Order = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useOrderStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function markOrderPaid(id: string, changes: Partial<OrderInput>): Promise<Order> {
  await mockCall('markOrderPaid');
  const current = useOrderStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Order not found');
  const record: Order = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useOrderStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function cancelOrder(id: string, changes: Partial<OrderInput>): Promise<Order> {
  await mockCall('cancelOrder');
  const current = useOrderStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Order not found');
  const record: Order = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useOrderStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function markOrderPickedUp(id: string, changes: Partial<OrderInput>): Promise<Order> {
  await mockCall('markOrderPickedUp');
  const current = useOrderStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Order not found');
  const record: Order = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useOrderStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}
