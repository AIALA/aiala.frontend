import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TasksApiService } from '../services/tasks-api.service';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';
import {
  GetTasksAction,
  TasksActionTypes,
  GetTasksSuccessAction,
  GetTasksErrorAction,
  SaveTaskAction,
  SaveTaskSuccessAction,
  SaveTaskErrorAction,
  DeleteTaskAction,
  DeleteTaskSuccessAction,
  DeleteTaskErrorAction
} from './tasks.actions';
import { Router } from '@angular/router';

@Injectable()
export class TasksEffects {
  @Effect()
  getTasks$: Observable<Action> = this.actions$.pipe(
    ofType<GetTasksAction>(TasksActionTypes.GetTasks),
    exhaustMap(() =>
      this.api.getTasks().pipe(
        map(result => new GetTasksSuccessAction(result)),
        catchError(error => of(new GetTasksErrorAction(error)))
      )
    )
  );

  @Effect()
  saveTask$: Observable<Action> = this.actions$.pipe(
    ofType<SaveTaskAction>(TasksActionTypes.SaveTask),
    switchMap(action =>
      this.api.saveTask(action.payload).pipe(
        map(result => new SaveTaskSuccessAction(result)),
        catchError(error => of(new SaveTaskErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  saveTaskSuccess$: Observable<any> = this.actions$.pipe(
    ofType<SaveTaskSuccessAction>(TasksActionTypes.SaveTaskSuccess),
    tap((action: SaveTaskSuccessAction) =>
      this.router.navigate(['/tasks/edit/' + action.payload.id], { replaceUrl: true })
    )
  );

  @Effect()
  deleteTask$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteTaskAction>(TasksActionTypes.DeleteTask),
    switchMap(action =>
      this.api.deleteTask(action.payload).pipe(
        map(result => new DeleteTaskSuccessAction(result)),
        catchError(error => of(new DeleteTaskErrorAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private api: TasksApiService,
    private router: Router
  ) {}
}
