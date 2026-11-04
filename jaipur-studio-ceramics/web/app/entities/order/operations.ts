import { mockCall, type Read, useRead } from '../mock';
import { usePieceStore, type Piece } from '../piece';

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

export async function lookupOrder(): Promise<Order[]> {
  await mockCall('lookupOrder');
  return useOrderStore.getState().records;
}

export function useLookupOrder(): Read<Order[]> {
  return useRead('lookupOrder', useOrderStore('records'));
}

export async function createOrder(input: OrderInput): Promise<Order> {
  await mockCall('createOrder');
  const now = new Date().toISOString();
  const record: Order = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useOrderStore.setState(({ records }) => ({ records: [...records, record] }));
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

export async function advanceOrderFulfilment(id: string, changes: Partial<OrderInput>): Promise<Order> {
  await mockCall('advanceOrderFulfilment');
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

/** One cart line's draw on a variant's stock. */
export type StockDecrement = {
  pieceId: string;
  glaze: string;
  size: string;
  quantity: number;
};

const variantIndex = (record: Piece, glaze: string, size: string) =>
  record.glaze.findIndex(
    (entry, i) => entry === glaze && record.size[i] === size,
  );

/**
 * Place an order and reduce each variant's stock as one change: every
 * decrement is checked first, and when creating the order fails the stock
 * goes back, so a failure never leaves partial stock loss.
 */
export async function createOrderWithStock(
  input: OrderInput,
  decrements: StockDecrement[],
): Promise<Order> {
  await mockCall('createOrder');
  const snapshot = usePieceStore.getState().records;
  const next = snapshot.map((record) => ({
    ...record,
    stockQuantity: [...record.stockQuantity],
  }));
  for (const decrement of decrements) {
    const record = next.find((entry) => entry.id === decrement.pieceId);
    const at = record
      ? variantIndex(record, decrement.glaze, decrement.size)
      : -1;
    if (!record || at < 0) {
      throw new Error(
        `${decrement.glaze} in ${decrement.size} is no longer available.`,
      );
    }
    if (record.stockQuantity[at] < decrement.quantity) {
      throw new Error(
        `Only ${record.stockQuantity[at]} left for ${decrement.glaze} in ${decrement.size}.`,
      );
    }
    record.stockQuantity[at] -= decrement.quantity;
  }
  usePieceStore.setState({ records: next });
  try {
    const now = new Date().toISOString();
    const record: Order = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    useOrderStore.setState(({ records }) => ({ records: [...records, record] }));
    return record;
  } catch (error) {
    usePieceStore.setState({ records: snapshot });
    throw error;
  }
}

/** An ordered line whose stock could not be restored on cancel. */
export type UnrestoredLine = {
  title: string;
  glaze: string;
  size: string;
};

/**
 * Cancel a New or Packed order and restore each variant's stock as one
 * change, matched by the ordered piece's id. Lines whose piece or variant
 * is gone are restored for nothing and reported back instead of silently
 * skipped; when cancelling itself fails the stock goes back, so the order
 * is either cancelled or left exactly as it was.
 */
export async function cancelOrderWithRestore(
  id: string,
): Promise<{ order: Order; unrestored: UnrestoredLine[] }> {
  await mockCall('cancelOrder');
  const current = useOrderStore.getState().records.find(
    (record) => record.id === id,
  );
  if (!current) throw new Error('Order not found');
  if (
    current.fulfilmentStatus !== 'new' &&
    current.fulfilmentStatus !== 'packed'
  ) {
    throw new Error('Only New or Packed orders can be cancelled.');
  }
  const snapshot = usePieceStore.getState().records;
  const next = snapshot.map((record) => ({
    ...record,
    stockQuantity: [...record.stockQuantity],
  }));
  const unrestored: UnrestoredLine[] = [];
  current.itemTitle.forEach((title, index) => {
    const pieceId = current.itemPieceId?.[index];
    const record = pieceId
      ? next.find((entry) => entry.id === pieceId)
      : undefined;
    const at = record
      ? variantIndex(
          record,
          current.itemGlaze[index],
          current.itemSize[index],
        )
      : -1;
    if (!record || at < 0) {
      unrestored.push({
        title,
        glaze: current.itemGlaze[index],
        size: current.itemSize[index],
      });
      return;
    }
    record.stockQuantity[at] += current.quantity[index];
  });
  usePieceStore.setState({ records: next });
  try {
    const record: Order = {
      ...current,
      fulfilmentStatus: 'cancelled',
      updatedAt: new Date().toISOString(),
    };
    useOrderStore.setState(({ records }) => ({
      records: records.map((r) => (r.id === id ? record : r)),
    }));
    return { order: record, unrestored };
  } catch (error) {
    usePieceStore.setState({ records: snapshot });
    throw error;
  }
}
