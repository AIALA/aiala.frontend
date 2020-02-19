import { ScheduledTask, ScheduledTaskApiModel } from './ScheduledTask';
import { DateTime } from 'luxon';

export interface Day {
  id: string;
  isTemporaryEntity: boolean;
  name: string;
  date: DateTime;
  shortDateString: string;
  tasks: ScheduledTask[];
}

export interface DayApiModel {
  id: string;
  isTemporaryEntity: boolean;
  name: string;
  date: string;
  tasks: ScheduledTaskApiModel[];
}
