import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksFacade } from '../+state/tasks.facade';
import { combineLatest, Subscription, ReplaySubject } from 'rxjs';
import { Step, Task } from '../models/Task';
import { map, tap, filter, delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CanComponentDeactivateBase } from '@msft-aiala/shared';
import { Duration } from 'luxon';
import { UserOverviewFacade } from '@xpdo/core/xdk';
import { Picture, PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent extends CanComponentDeactivateBase implements OnInit, OnDestroy {
  taskSub: Subscription;
  pictureUrlSub: Subscription;
  pictureUrl$: ReplaySubject<string> = new ReplaySubject<string>(1);
  saving$ = this.facade.saving$;
  loading$ = this.facade.loading$;
  users$ = this.userFacade.users$;
  form: FormGroup;
  step = Duration.fromObject({hour: 1, minute: 1});
  taskName: string;
  pictureType = PictureType.TaskPictures;

  get steps(): FormArray {
    return this.form.controls['steps'] as FormArray;
  }

  get useTaskContacts(): FormControl {
    return this.form.controls['useTaskContacts'] as FormControl;
  }

  get picture(): FormGroup {
    return this.form.controls['picture'] as FormGroup;
  }

  constructor(
    private facade: TasksFacade,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userFacade: UserOverviewFacade
  ) {
    super();

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      duration: ['', Validators.required],
      picture: this.formBuilder.group({
        id: [''],
        pictureUrl: ['']
      }),
      placeId: [''],
      freeFormPlace: [''],
      emergencyContact1Id: [''],
      emergencyContact2Id: [''],
      useTaskContacts: [false],
      steps: this.formBuilder.array([])
    });
    this.pictureUrlSub = this.picture.controls['pictureUrl'].valueChanges.subscribe(value => this.pictureUrl$.next(value));
  }

  ngOnInit() {
    this.userFacade.load();
    this.taskSub = combineLatest([
      this.activatedRoute.params,
      this.facade.tasks$
    ]).pipe(
      map(([params, tasks]) => [params['id'], tasks.filter(t => t.id === params['id'])[0]]),
      map(([id, task]) => {
        if (id) {
          if (!task) {
            this.facade.loadTasks();
            return null;
          }
          return task;
        } else {
          return {
            id: null,
            name: '',
            duration: Duration.fromObject({minute: 30}),
            placeId: '',
            freeFormPlace: '',
            picture: {
              id: '',
              pictureUrl: ''
            },
            emergencyContact1Id: null,
            emergencyContact2Id: null,
            useTaskContacts: false,
            steps: []
          } as Task;
        }
      }),
      filter(task => task),
      // stop unsaved changes prompt from showing when creating new task
      tap(() => this.form.markAsPristine()),
      delay(0)
    ).subscribe((task: Task) => {
      this.taskName = task.name;
      this.form.patchValue({
        id: task.id,
        name: task.name,
        placeId: task.placeId,
        freeFormPlace: task.freeFormPlace,
        duration: task.duration,
        picture: {
          ...task.picture
        },
        emergencyContact1Id: task.emergencyContact1Id,
        emergencyContact2Id: task.emergencyContact2Id,
        useTaskContacts: task.useTaskContacts
      } as Task);
      this.steps.controls = [];
      task.steps = task.steps.sort((a, b) => a.order - b.order);
      task.steps.forEach(s => {
        this.steps.push(this.createStepsGroup(s));
      });
      this.form.markAsPristine();
    });
  }

  ngOnDestroy(): void {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
    if (this.pictureUrlSub) {
      this.pictureUrlSub.unsubscribe();
    }
  }

  canDeactivate(): boolean {
    return this.form.pristine;
  }

  save() {
    this.facade.saveTask(this.form.value);
  }

  onDeleteStep(formIndex: number): void {
    this.steps.removeAt(formIndex);
    this.steps.markAsDirty();
  }

  onAddStep(): void {
    this.steps.push(this.createStepsGroup());
    this.steps.markAsDirty();
  }

  savePicture(picture: Picture): void {
    this.form.patchValue({
      picture: picture
    } as Partial<Task>);
    this.picture.markAsDirty();
  }

  private createStepsGroup(step?: Step): FormGroup {
    step = step || {
      id: null,
      text: '',
      order: this.steps.length
    };

    return this.formBuilder.group({
      id: [step.id],
      text: [step.text, Validators.required],
      order: [step.order, Validators.required]
    });
  }
}
