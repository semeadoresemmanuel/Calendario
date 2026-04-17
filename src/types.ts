export type ItemType = 'task' | 'event';

export interface CalendarItem {
  id: string;
  title: string;
  date: Date;
  type: ItemType;
  startTime?: string;
  endTime?: string;
  description?: string;
  modalidade?: string;
  completed?: boolean;
}

export interface DateRange {
  start: Date;
  end: Date;
}
