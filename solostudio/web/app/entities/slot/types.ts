export type Slot = {
  id: string;
  createdAt: string;
  updatedAt: string;
  sessionType: string;
  startAt: string;
};

/** What a create takes: everything but the fields the store sets. */
export type SlotInput = Omit<Slot, 'id' | 'createdAt' | 'updatedAt'>;
