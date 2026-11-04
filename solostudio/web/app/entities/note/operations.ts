import { mockCall, type Read, useRead } from '../mock';

import { useNoteStore } from './store';

import type { Note, NoteInput } from './types';

export async function listNotes(): Promise<Note[]> {
  await mockCall('listNotes');
  return useNoteStore.getState().records;
}

export function useListNotes(): Read<Note[]> {
  return useRead('listNotes', useNoteStore('records'));
}

export async function getNote(id: string): Promise<Note | undefined> {
  await mockCall('getNote');
  return useNoteStore.getState().records.find((record) => record.id === id);
}

export function useGetNote(id: string): Read<Note | undefined> {
  return useRead('getNote', useNoteStore(({ records }) => records.find((record) => record.id === id)));
}

export async function createNote(input: NoteInput): Promise<Note> {
  await mockCall('createNote');
  const now = new Date().toISOString();
  const record: Note = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  useNoteStore.setState(({ records }) => ({ records: [...records, record] }));
  return record;
}

export async function updateNote(id: string, changes: Partial<NoteInput>): Promise<Note> {
  await mockCall('updateNote');
  const current = useNoteStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Note not found');
  const record: Note = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useNoteStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function markFollowUpDone(id: string, changes: Partial<NoteInput>): Promise<Note> {
  await mockCall('markFollowUpDone');
  const current = useNoteStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Note not found');
  const record: Note = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useNoteStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function pushFollowUpWeek(id: string, changes: Partial<NoteInput>): Promise<Note> {
  await mockCall('pushFollowUpWeek');
  const current = useNoteStore.getState().records.find((record) => record.id === id);
  if (!current) throw new Error('Note not found');
  const record: Note = { ...current, ...changes, updatedAt: new Date().toISOString() };
  useNoteStore.setState(({ records }) => ({ records: records.map((r) => (r.id === id ? record : r)) }));
  return record;
}

export async function deleteNote(id: string): Promise<void> {
  await mockCall('deleteNote');
  useNoteStore.setState(({ records }) => ({ records: records.filter((record) => record.id !== id) }));
}
