import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, map, take, tap, delay } from 'rxjs/operators';
import { Day } from '../models/Day';
import { ScheduleFacade } from '../+state/schedule.facade';
import { Task, TasksFacade } from '@msft-aiala/tasks';
import { DateTime, Duration, Interval } from 'luxon';
import { UpsertedDayTask } from '../models/UpsertedDayTask';
import { UpsertedDay } from '../models/UpsertedDay';
import { HttpErrorResponse } from '@angular/common/http';
import { DayTemplatesFacade } from '../+state/day-templates/day-templates.facade';
import { DayTemplate } from '../models/DayTemplate';
import { XpdoDynamicDialog } from '@xpdo/components';
import { CreateTemplateDialogComponent } from '../create-template-dialog/create-template-dialog.component';
import { CanComponentDeactivateBase } from '@msft-aiala/shared';
import { LocalizationSettingsFacade } from '@msft-aiala/settings';
import { ScheduleEditableConfig } from '../models/ScheduleEditableConfig';

@Component({
  selector: 'msft-aiala-edit-day',
  templateUrl: './edit-day.component.html',
  styleUrls: ['./edit-day.component.scss']
})
export class EditDayComponent extends CanComponentDeactivateBase implements OnInit {
  form: FormGroup;
  day$: Observable<Day>;
  loading$: Observable<boolean>;
  saving$ = this.facade.saving$;
  savingTemplates$ = this.templatesFacade.saving$;
  error$: Observable<string[]>;
  generalError$ = this.facade.generalError$;
  date$: Observable<Date>;
  editableConfig: ScheduleEditableConfig;

  get tasks(): FormArray {
    return this.form.controls['tasks'] as FormArray;
  }

  get date(): FormControl {
    return this.form.controls['date'] as FormControl;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private facade: ScheduleFacade,
    private templatesFacade: DayTemplatesFacade,
    private tasksFacade: TasksFacade,
    private localizationSettingsFacade: LocalizationSettingsFacade,
    private dialog: XpdoDynamicDialog
  ) {
    super();
    this.form = this.formBuilder.group({
      id: [null],
      date: ['', Validators.required],
      name: ['', Validators.required],
      tasks: this.formBuilder.array([])
    });
    this.date$ = this.date.valueChanges;
  }

  ngOnInit() {
    this.templatesFacade.getDayTemplates();

    this.day$ = combineLatest(
      this.activatedRoute.params,
      this.facade.days$,
      this.facade.loadedRange$
    ).pipe(
      map(([params, days, loadedRange]) => [
        params['isoDate'],
        days.filter(d => d.shortDateString === params['isoDate'])[0],
        loadedRange
      ]),
      map(([isoDate, day, loadedRange]: [string, Day, Interval]) => {
        const date = isoDate ? DateTime.fromISO(isoDate, { zone: 'utc' }) : null;

        if (!loadedRange || (isoDate && day && !loadedRange.contains(date))) {
          this.facade.loading$.pipe(
            take(1)
          ).subscribe(loading => {
            if (!loading) {
              this.facade.loadDaysToday();
            }
          });
          return null;
        }

        if (day) {
          return day;
        } else {
          return {
            id: null,
            date: date,
            name: '',
            tasks: []
          } as Day;
        }
      }),
      filter(day => !!day),
      delay(0),
      tap(day => {
        this.localizationSettingsFacade.localizationSettings$.pipe(
          filter(s => !!s),
          take(1)
        ).subscribe(settings => {
          this.editableConfig = new ScheduleEditableConfig(day.date, settings.timeZoneOffset);
        });

        this.form.patchValue(day);
        this.tasks.controls = [];
        day.tasks.forEach(t => {
          this.addTask({
            id: t.id,
            taskId: t.taskId,
            end: t.end,
            start: t.start
          }, t.name);
        });
        this.form.markAsPristine();
      })
    );

    this.error$ = this.facade.error$.pipe(
      map((error: HttpErrorResponse) => {
        if (!error) {
          return null;
        }

        const taskErrors: string[] = [];
        Object.keys(error).filter(key => key.startsWith('task-')).forEach(key => {
          const index = parseInt(key.replace('task-', ''), 10);
          const task = this.tasks.value[index];
          taskErrors.push(`${task.name}: ${error[key]}`);
        });
        if (error['other']) {
          taskErrors.push(error['other']);
        }
        return taskErrors;
      })
    );

    this.loading$ = combineLatest(
      this.day$,
      this.facade.loading$
    ).pipe(
      map(([day, loading]) => !day || loading)
    );
  }

  onAddTask(task: Task): void {
    let start: Duration;
    if (this.tasks.controls.length !== 0) {
      start = this.tasks.controls[this.tasks.controls.length - 1].value.end;
    } else {
      start = Duration.fromObject({ hour: 6 });
    }

    if (this.editableConfig.isToday && start < this.editableConfig.getEarliestEditableTime()) {
      start = Duration.fromMillis(this.editableConfig.getEarliestEditableTime().plus({
        minutes: 5
      }).valueOf());
    }

    const end = start.plus(task.duration);

    if (end.as('hours') > 24) {
      return;
    }

    const upsertedTask = {
      id: null,
      taskId: task.id,
      end: end,
      start: start
    } as UpsertedDayTask;

    this.addTask(upsertedTask, task.name);
  }

  onApplyTemplate(dayTemplate: DayTemplate): void {
    this.tasksFacade.getTaskNames(dayTemplate.tasks.map(t => t.taskId)).subscribe(taskNames => {
      this.form.patchValue({
        name: dayTemplate.dayName
      });
      this.form.markAsDirty();
      this.tasks.controls = [];

      dayTemplate.tasks.forEach(taskTemplate => {
        this.addTask(taskTemplate, taskNames[taskTemplate.taskId] || 'Task not found');
      });
    });
  }

  addTask(task: UpsertedDayTask, name: string): void {
    this.tasks.controls.push(this.formBuilder.group({
      name: [name],
      id: [task.id],
      taskId: [task.taskId, Validators.required],
      start: [task.start, Validators.required],
      end: [task.end, Validators.required]
    }));
    this.tasks.controls.sort((a, b) => {
      return a.value.valueOf() - b.value.valueOf();
    });
    this.tasks.patchValue([]);
    this.form.markAsDirty();
  }

  save(): void {
    // Remove informational name property from form
    const upsertedDay = {
      ...this.form.value,
      tasks: this.form.value.tasks.map(t => ({
        id: t.id,
        taskId: t.taskId,
        start: t.start,
        end: t.end
      }) as UpsertedDayTask)
    } as UpsertedDay;
    this.facade.upsertDay(upsertedDay);
  }

  createDayTemplate(): void {
    const day = this.form.value as UpsertedDay;
    this.dialog.open(CreateTemplateDialogComponent, {
      data: day,
      disableClose: true,
      minWidth: '400px'
    });
  }

  canDeactivate(): (Observable<boolean> | Promise<boolean> | boolean) {
    return this.form.pristine;
  }
}
