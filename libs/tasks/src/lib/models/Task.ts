import { Duration } from 'luxon';
import { Picture } from '@msft-aiala/picture';

interface BaseTask {
  id: string;
  name: string;
  placeId: string;
  freeFormPlace: string;
  emergencyContact1Id: string;
  emergencyContact2Id: string;
  useTaskContacts: boolean;
  picture: Picture;
  steps: Step[];
}

export interface Task extends BaseTask {
  duration: Duration;
}

export interface TaskApiModel extends BaseTask {
  duration: string;
}

export interface Step {
  id: string;
  text: string;
  order: number;
}
