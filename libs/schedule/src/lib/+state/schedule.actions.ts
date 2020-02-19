import { Action } from '@ngrx/store';
import { Day } from '../models/Day';
import { HttpErrorResponse } from '@angular/common/http';
import { DateTime, Interval } from 'luxon';
import { UpsertedDay } from '../models/UpsertedDay';

export enum ScheduleActionTypes {
  GetDays = '[schedule] Get Days',
  GetDaysSuccess = '[schedule] Get Days Success',
  GetDaysError = '[schedule] Get Days Error',

  UpsertDay = '[schedule] Upsert Day',
  UpsertDaySuccess = '[schedule] Upsert Day Success',
  UpsertDayError = '[schedule] Upsert Day Error'
}

export class GetDaysAction implements Action {
  type = ScheduleActionTypes.GetDays;
  constructor(public payload: Interval) {}
}

export class GetDaysSuccessAction implements Action {
  type = ScheduleActionTypes.GetDaysSuccess;
  constructor(public payload: { days: Day[], start: DateTime, end: DateTime }) {}
}

export class GetDaysErrorAction implements Action {
  type = ScheduleActionTypes.GetDaysError;
  constructor(public error: HttpErrorResponse) {}
}

export class UpsertDayAction implements Action {
  type = ScheduleActionTypes.UpsertDay;
  constructor(public payload: UpsertedDay) {}
}

export class UpsertDaySuccessAction implements Action {
  type = ScheduleActionTypes.UpsertDaySuccess;
  constructor() {}
}

export class UpsertDayErrorAction implements Action {
  type = ScheduleActionTypes.UpsertDayError;
  constructor(public error: HttpErrorResponse) {}
}

export type ScheduleAction =
  | GetDaysAction
  | GetDaysSuccessAction
  | GetDaysErrorAction
  | UpsertDayAction
  | UpsertDaySuccessAction
  | UpsertDayErrorAction;
