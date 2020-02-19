import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import {
  EditDayTaskDialogData,
  EditDayTaskDialogResult,
  EditDayTaskDialogResultType
} from '../models/EditDayTaskDialogData';
import { XpdoDynamicDialog } from '@xpdo/components';
import { EditDayTaskDialogComponent } from '../edit-day-task-dialog/edit-day-task-dialog.component';
import { filter, map } from 'rxjs/operators';
import { ScheduleFacade } from '../+state/schedule.facade';
import { DateTime, Duration } from 'luxon';
import { ScheduledTask } from '@msft-aiala/schedule';
import { ScheduleEditableConfig } from '../models/ScheduleEditableConfig';

@Component({
  selector: 'msft-aiala-edit-day-schedule',
  templateUrl: './edit-day-schedule.component.html',
  styleUrls: ['./edit-day-schedule.component.scss']
})
export class EditDayScheduleComponent implements OnInit, AfterViewInit {
  static readonly millisecondsPerDay = 86400000;

  private _today: DateTime;

  @ViewChild('dayContainer') dayContainer: ElementRef;
  @Input() form: FormGroup;
  @Input() editableConfig: ScheduleEditableConfig;

  @Input()
  set today(value: DateTime) {
    this._today = value;
  };
  get today(): DateTime {
    return this._today;
  }

  get tasks(): FormArray {
    return this.form.controls['tasks'] as FormArray;
  }

  halfHourDefinitions: SchedulerElementDefinition[] = [];
  taskDefinitions$: Observable<TaskElementDefinition[]>;
  dayContainerHeight = 0;

  constructor(
    private dialog: XpdoDynamicDialog,
    private facade: ScheduleFacade
  ) { }

  ngOnInit() {
    this.taskDefinitions$ = combineLatest(
      this.tasks.valueChanges,
      this.facade.loading$
    ).pipe(
      filter(([value, loading]) => !loading && value),
      map(([value, loading]) => value),
      map(tasks => this.getTaskDefinitions(tasks))
    );

    this.dayContainerHeight = this.dayContainer.nativeElement.offsetHeight;

    let date = DateTime.fromSeconds(0, { zone: 'utc' });
    this.halfHourDefinitions = [];
    for(let iHalfHour = 0; iHalfHour < 48; iHalfHour++) {
      this.halfHourDefinitions.push({
        text: date.toLocaleString(DateTime.TIME_SIMPLE),
        offsetTop: (100 / 48 * iHalfHour) + '%',
        height: (100 / 48) + '%'
      });
      date = date.plus({ minute: 30 });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('half-hour-12').scrollIntoView();
    });
  }

  getTaskDefinitions(tasks: ScheduledTask[]): TaskElementDefinition[] {
    const result = [];
    this.tasks.controls.forEach(tc => {
      result.push({
        text: tc.value.name,
        start: tc.value.start,
        end: tc.value.end,
        offsetTop: ((tc.value.start as Duration).as('millisecond') / EditDayScheduleComponent.millisecondsPerDay * 100) + '%',
        height: ((tc.value.end as Duration).minus(tc.value.start).as('millisecond') / EditDayScheduleComponent.millisecondsPerDay * 100) + '%'
      });
    });
    return result;
  }

  openTaskDialog(index: number): void {
    const taskControl = this.tasks.controls[index];
    const dialogData = {
      task: this.tasks.controls[index].value,
      tasksFormArray: this.tasks,
      editableConfig: this.editableConfig
    } as EditDayTaskDialogData;
    this.dialog.open(EditDayTaskDialogComponent, {
      data: dialogData,
      disableClose: true,
      minWidth: '400px'
    }).afterClosed().pipe(
      filter((data: EditDayTaskDialogResult) => data && data.resultType !== EditDayTaskDialogResultType.Cancel)
    ).subscribe(data => {
      if (data.resultType === EditDayTaskDialogResultType.Apply) {
        taskControl.patchValue(data.data);
      } else {
        this.tasks.removeAt(this.tasks.controls.indexOf(taskControl));
      }

      this.tasks.patchValue([]);
      this.tasks.markAsDirty();
    });
  }
}

interface SchedulerElementDefinition {
  text: string;
  offsetTop: string;
  height: string;
}
interface TaskElementDefinition extends SchedulerElementDefinition {
  start: DateTime;
  end: DateTime;
}
