import { Duration } from 'luxon';

export interface UpsertedDayTask {
  id: string;
  taskId: string;
  start: Duration;
  end: Duration;
}

export interface UpsertedDayTaskApiModel {
  id: string;
  taskId: string;
  start: string;
  end: string;
}
