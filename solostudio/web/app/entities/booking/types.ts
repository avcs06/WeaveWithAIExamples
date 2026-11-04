export type Booking = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  sessionType: string;
  slot: string;
  client?: string;
  isCancelled?: boolean;
};

/** What a create takes: everything but the fields the store sets. */
export type BookingInput = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
