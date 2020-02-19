import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  EditDayTaskDialogData,
  EditDayTaskDialogResult,
  EditDayTaskDialogResultType
} from '../models/EditDayTaskDialogData';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, FormControl } from '@angular/forms';
import { Duration } from 'luxon';
import { ScheduleEditableConfig } from '../models/ScheduleEditableConfig';

@Component({
  selector: 'msft-aiala-edit-day-task-dialog',
  templateUrl: './edit-day-task-dialog.component.html',
  styleUrls: ['./edit-day-task-dialog.component.scss']
})
export class EditDayTaskDialogComponent implements OnInit {
  form: FormGroup;
  step: Duration = Duration.fromObject({ hour: 1, minute: 1 });
  readonly = false;
  editableConfig: ScheduleEditableConfig;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: EditDayTaskDialogData,
    private dialogRef: MatDialogRef<EditDayTaskDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.editableConfig = dialogData.editableConfig;
    this.readonly = this.editableConfig.isPast
      || (
        this.editableConfig.isToday
        && this.editableConfig.getEarliestEditableTime() > this.dialogData.task.start
        && this.dialogData.task.id !== null
      );

    this.form = this.formBuilder.group({
      start: new FormControl({
        value: dialogData.task.start,
        disabled: this.readonly
      }, Validators.required),
      end: new FormControl({
        value: dialogData.task.end,
        disabled: this.readonly
      }, Validators.required)
    }, {
      validators: [
        this.validateDates.bind(this)
      ]
    });
  }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close({
      data: null,
      resultType: EditDayTaskDialogResultType.Cancel
    } as EditDayTaskDialogResult);
  }

  apply(): void {
    this.dialogRef.close({
      data: {
        start: this.form.value.start,
        end: this.form.value.end
      },
      resultType: EditDayTaskDialogResultType.Apply
    } as EditDayTaskDialogResult);
  }

  remove(): void {
    this.dialogRef.close({
      data: null,
      resultType: EditDayTaskDialogResultType.Remove
    } as EditDayTaskDialogResult);
  }

  validateDates(control: AbstractControl): ValidationErrors {
    const errors = {};

    const start: Duration = control.value.start;
    const end: Duration = control.value.end;

    if (!start || !end) {
      return errors;
    }

    if (start >= end) {
      errors['startAfterEnd'] = true;
      return errors;
    }

    if (this.editableConfig.isToday && this.editableConfig.getEarliestEditableTime() > start) {
      errors['earliestEditableTime'] = true;
      return errors;
    }

    const overlappingTasks = this.dialogData.tasksFormArray.controls.filter((c: AbstractControl) => {
      return c.value !== this.dialogData.task
        && c.value.end > start
        && c.value.start < end;
    });

    if (overlappingTasks.length !== 0) {
      errors['overlap'] = overlappingTasks.map(c => `<li>${c.value.name} (${c.value.start.toFormat('hh:mm')} - ${c.value.end.toFormat('hh:mm')})</li>`).join('');
    }

    return errors;
  }
}
