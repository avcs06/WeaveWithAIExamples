export const ClientStatusOptions = [
  { key: 'lead', label: "Lead" },
  { key: 'active', label: "Active" },
  { key: 'past', label: "Past" },
] as const;

export type ClientStatus = (typeof ClientStatusOptions)[number]['key'];

export const TaskStatusOptions = [
  { key: 'to_do', label: "To do" },
  { key: 'in_progress', label: "In progress" },
  { key: 'done', label: "Done" },
] as const;

export type TaskStatus = (typeof TaskStatusOptions)[number]['key'];

export const TaskPriorityOptions = [
  { key: 'low', label: "Low" },
  { key: 'medium', label: "Medium" },
  { key: 'high', label: "High" },
] as const;

export type TaskPriority = (typeof TaskPriorityOptions)[number]['key'];

export const DayOfWeekOptions = [
  { key: 'monday', label: "Monday" },
  { key: 'tuesday', label: "Tuesday" },
  { key: 'wednesday', label: "Wednesday" },
  { key: 'thursday', label: "Thursday" },
  { key: 'friday', label: "Friday" },
  { key: 'saturday', label: "Saturday" },
  { key: 'sunday', label: "Sunday" },
] as const;

export type DayOfWeek = (typeof DayOfWeekOptions)[number]['key'];
