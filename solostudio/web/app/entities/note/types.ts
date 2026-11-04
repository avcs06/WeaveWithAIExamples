export type Note = {
  id: string;
  createdAt: string;
  updatedAt: string;
  noteText: string;
  noteDate: string;
  followUpDate?: string;
  client: string;
};

/** What a create takes: everything but the fields the store sets. */
export type NoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
