import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ScheduleApiService } from '../services/schedule-api.service';
import {
  GetDaysAction,
  GetDaysSuccessAction,
  ScheduleActionTypes,
  UpsertDayAction, UpsertDayErrorAction,
  UpsertDaySuccessAction
} from './schedule.actions';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { SchedulePartialState } from './schedule.reducer';
import { scheduleQuery } from './schedule.selectors';

@Injectable()
export class ScheduleEffects {
  @Effect()
  getDays$: Observable<Action> = this.actions$.pipe(
    ofType<GetDaysAction>(ScheduleActionTypes.GetDays),
    mergeMap(action =>
      this.apiService.getDays(action.payload.start, action.payload.end).pipe(
        map(result => new GetDaysSuccessAction({
          days: result,
          start: action.payload.start,
          end: action.payload.end
        }))
      )
    )
  );

  @Effect()
  upsertDay$: Observable<Action> = this.actions$.pipe(
    ofType<UpsertDayAction>(ScheduleActionTypes.UpsertDay),
    switchMap(action =>
      this.apiService.upsertDay(action.payload).pipe(
        map(() => new UpsertDaySuccessAction()),
        catchError(error => of(new UpsertDayErrorAction(error)))
      )
    )
  );

  @Effect()
  upsertDaySuccess$: Observable<Action> = this.actions$.pipe(
    ofType<UpsertDaySuccessAction>(ScheduleActionTypes.UpsertDaySuccess),
    withLatestFrom(this.store.pipe(select(scheduleQuery.getLoadedRange))),
    map(([action, range]) => new GetDaysAction(range))
  );

  constructor(
    private actions$: Actions,
    private apiService: ScheduleApiService,
    private store: Store<SchedulePartialState>
  ) {}
}
