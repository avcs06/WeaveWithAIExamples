import type { DayOfWeek } from '../enums';

export type Availability = {
  id: string;
  createdAt: string;
  updatedAt: string;
  days?: DayOfWeek[];
  fromTime?: string;
  toTime?: string;
};

/** What a create takes: everything but the fields the store sets. */
export type AvailabilityInput = Omit<Availability, 'id' | 'createdAt' | 'updatedAt'>;
