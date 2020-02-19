import { ScheduledTask } from '@msft-aiala/schedule';
import { FormArray } from '@angular/forms';
import { ScheduleEditableConfig } from './ScheduleEditableConfig';

export interface EditDayTaskDialogData {
  task: ScheduledTask;
  tasksFormArray: FormArray;
  editableConfig: ScheduleEditableConfig;
}

export interface EditDayTaskDialogResult {
  data: Partial<ScheduledTask>;
  resultType: EditDayTaskDialogResultType;
}

export enum EditDayTaskDialogResultType {
  Cancel = 'cancel',
  Apply = 'apply',
  Remove = 'remove'
}
