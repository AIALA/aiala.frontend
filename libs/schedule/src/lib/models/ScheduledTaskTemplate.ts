import { Duration } from 'luxon';

export interface ScheduledTaskTemplate {
  id: string;
  taskId: string;
  start: Duration;
  end: Duration;
}

export interface ScheduledTaskTemplateApiModel {
  id: string;
  taskId: string;
  start: string;
  end: string;
}
