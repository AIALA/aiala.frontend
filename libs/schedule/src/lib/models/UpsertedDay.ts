import { UpsertedDayTask, UpsertedDayTaskApiModel } from './UpsertedDayTask';
import { DateTime } from 'luxon';

export interface UpsertedDay {
  id: string;
  name: string;
  date: DateTime;
  tasks: UpsertedDayTask[];
}

export interface UpsertedDayApiModel {
  id: string;
  name: string;
  date: string;
  tasks: UpsertedDayTaskApiModel[];
}
