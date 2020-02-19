import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  CreateDayTemplateAction,
  CreateDayTemplateErrorAction,
  CreateDayTemplateSuccessAction,
  DayTemplatesActionTypes,
  DeleteDayTemplateAction, DeleteDayTemplateErrorAction, DeleteDayTemplateSuccessAction,
  GetDayTemplatesAction,
  GetDayTemplatesErrorAction,
  GetDayTemplatesSuccessAction
} from './day-templates.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ScheduleApiService } from '../../services/schedule-api.service';
import { UpsertDayErrorAction } from '../schedule.actions';

@Injectable()
export class DayTemplatesEffects {
  @Effect()
  createDayTemplate$: Observable<Action> = this.actions$.pipe(
    ofType<CreateDayTemplateAction>(DayTemplatesActionTypes.CreateDayTemplate),
    switchMap(action =>
      this.apiService.createDayTemplate(action.payload).pipe(
        map(() => new CreateDayTemplateSuccessAction()),
        catchError(error => of(new CreateDayTemplateErrorAction(error)))
      )
    )
  );

  @Effect()
  createDayTemplateSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<CreateDayTemplateSuccessAction>(DayTemplatesActionTypes.CreateDayTemplateSuccess),
    map(() => new GetDayTemplatesAction())
  );

  @Effect()
  createDayTemplateError$: Observable<Action> = this.actions$.pipe(
    ofType<CreateDayTemplateErrorAction>(DayTemplatesActionTypes.CreateDayTemplateError),
    map((action: CreateDayTemplateErrorAction) => new UpsertDayErrorAction(action.error))
  );

  @Effect()
  getDayTemplates$: Observable<Action> = this.actions$.pipe(
    ofType<GetDayTemplatesAction>(DayTemplatesActionTypes.GetDayTemplates),
    mergeMap(() => this.apiService.getDayTemplates().pipe(
        map(result => new GetDayTemplatesSuccessAction(result)),
        catchError(error => of(new GetDayTemplatesErrorAction(error)))
      )
    )
  );

  @Effect()
  deleteDayTemplate$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteDayTemplateAction>(DayTemplatesActionTypes.DeleteDayTemplate),
    switchMap((action: DeleteDayTemplateAction) =>
      this.apiService.deleteDayTemplate(action.payload).pipe(
        map(() => new DeleteDayTemplateSuccessAction()),
        catchError(error => of(new DeleteDayTemplateErrorAction(error)))
      )
    )
  );

  @Effect()
  deleteDayTemplateSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteDayTemplateSuccessAction>(DayTemplatesActionTypes.DeleteDayTemplateSuccess),
    map(() => new GetDayTemplatesAction())
  );

  constructor(
    private actions$: Actions,
    private apiService: ScheduleApiService
  ) {}
}
