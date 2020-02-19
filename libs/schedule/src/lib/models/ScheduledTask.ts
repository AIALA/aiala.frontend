import { ScheduledStep } from './ScheduledStep';
import { Duration } from 'luxon';
import { ScheduledPlace } from './ScheduledPlace';
import { Picture } from '@msft-aiala/picture';

interface TaskBase {
  id: string;
  name: string;
  taskId: string;

  place: ScheduledPlace;
  steps: ScheduledStep[];
  picture: Picture;
  emergencyContacts: { name: string, pictureUrl: string }[];
}

export interface ScheduledTask extends TaskBase {
  start: Duration;
  end: Duration;
  defaultDuration: Duration;
}

export interface ScheduledTaskApiModel extends TaskBase {
  start: string;
  end: string;
  defaultDuration: string;
}
