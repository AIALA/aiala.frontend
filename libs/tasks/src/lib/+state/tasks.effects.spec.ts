import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { TasksApiService } from '../services/tasks-api.service';
import { TasksApiServiceMock } from '../../testing/tasks-testing.module';
import { provideMockActions } from '@ngrx/effects/testing';
import { TasksEffects } from './tasks.effects';
import { hot } from '@nrwl/nx/testing';
import { GetTasksAction, GetTasksSuccessAction, SaveTaskAction, SaveTaskSuccessAction } from './tasks.actions';
import { Task } from '../models/Task';
import { RouterTestingModule } from '@angular/router/testing';

describe('TasksEffects', () => {
  let actions: Observable<any>;
  let effects: TasksEffects;
  let apiServiceMock: TasksApiServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        TasksEffects,
        provideMockActions(() => actions),
        { provide: TasksApiService, useClass: TasksApiServiceMock }
      ]
    });

    effects = TestBed.get(TasksEffects);
    apiServiceMock = TestBed.get(TasksApiService);
  });

  describe('getTasks$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new GetTasksAction() });
      const successValue: any = 'success';
      apiServiceMock.getTasks.and.returnValue(of(successValue));

      expect(effects.getTasks$).toBeObservable(
        hot('-a-|', { a: new GetTasksSuccessAction(successValue) })
      );
    });
  });

  describe('saveTask$', () => {
    it('should work', () => {
      const savedTask: any = {
        id: 'id',
        name: 'savedTask'
      } as Partial<Task>;
      const apiTask: any = {
        id: 'apiId',
        name: 'savedTask'
      } as Partial<Task>;

      actions = hot('-a-|', { a: new SaveTaskAction(savedTask) });
      apiServiceMock.saveTask.and.returnValue(of(apiTask));

      expect(effects.saveTask$).toBeObservable(
        hot('-a-|', { a: new SaveTaskSuccessAction(apiTask) })
      );
    });
  });
});
