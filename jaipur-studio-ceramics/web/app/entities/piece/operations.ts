import { mockCall, type Read, useRead } from '../mock';

import { usePieceStore } from './store';

import type { Piece, PieceInput } from './types';

export async function listPieces(): Promise<Piece[]> {
  await mockCall('listPieces');
  return usePieceStore.getState().records;
}

export function useListPieces(): Read<Piece[]> {
  return useRead('listPieces', usePieceStore('records'));
}

export async function getPiece(id: string): Promise<Piece | undefined> {
  await mockCall('getPiece');
  return usePieceStore.getState().records.find((record) => record.id === id);
}

export function useGetPiece(id: string): Read<Piece | undefined> {
  return useRead('getPiece', usePieceStore(({ records }) => records.find((record) => record.id === id)));
}

export async function createPiece(input: PieceInput): Promise<Piece> {
  await mockCall('createPiece');
  const now = new Date().toISOString();
  const record: Piece = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  usePieceStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function updatePiece(id: string, changes: Partial<PieceInput>): Promise<Piece> {
  await mockCall('updatePiece');
  const current = usePieceStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Piece not found');
  const record: Piece = { ...current, ...changes, updatedAt: new Date().toISOString() };
  usePieceStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function deletePiece(id: string): Promise<void> {
  await mockCall('deletePiece');
  usePieceStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}
