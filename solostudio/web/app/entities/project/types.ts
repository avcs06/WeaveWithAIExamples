export type Project = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  dueDate?: string;
  client: string;
};

/** What a create takes: everything but the fields the store sets. */
export type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
