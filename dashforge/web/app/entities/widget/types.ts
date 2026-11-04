import type { WidgetSize, WidgetType } from '../enums';

export type Widget = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title?: string;
  type: WidgetType;
  size: WidgetSize;
  noteText?: string;
  counterLabel?: string;
  counterValue?: number;
  position: number;
  dashboard: string;
  checklistItemText?: string[];
  checklistChecked?: boolean[];
  linkTitle?: string[];
  linkUrl?: string[];
};

/** What a create takes: everything but the fields the store sets. */
export type WidgetInput = Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>;
