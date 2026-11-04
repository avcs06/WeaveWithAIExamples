export type SessionType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  durationInMinutes: number;
  displayedPrice: number;
  maximumPeople: number;
};

/** What a create takes: everything but the fields the store sets. */
export type SessionTypeInput = Omit<SessionType, 'id' | 'createdAt' | 'updatedAt'>;
