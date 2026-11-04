import type { ClientStatus } from '../enums';

export type Client = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  company?: string;
  profile?: string;
  status: ClientStatus;
};

/** What a create takes: everything but the fields the store sets. */
export type ClientInput = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;
