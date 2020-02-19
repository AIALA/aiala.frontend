import { ScheduledTaskTemplate, ScheduledTaskTemplateApiModel } from './ScheduledTaskTemplate';

export interface DayTemplate {
  id: string;
  name: string;
  dayName: string;
  tasks: ScheduledTaskTemplate[];
}

export interface DayTemplateApiModel {
  id: string;
  name: string;
  dayName: string;
  tasks: ScheduledTaskTemplateApiModel[];
}
