import type { TaskPriority, TaskStatus } from '../enums';

export type Task = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  project: string;
};

/** What a create takes: everything but the fields the store sets. */
export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
