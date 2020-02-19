import { Action } from '@ngrx/store';
import { TimeZone } from '../models/TimeZone';

export enum TimeZonesActionTypes {
  GetTimeZones = '[TimeZones] Get TimeZones',
  GetTimeZonesSuccess = '[TimeZones] Get TimeZones Success',
  GetTimeZonesError = '[TimeZones] Get TimeZones Error'
}

export class GetTimeZonesAction implements Action {
  type = TimeZonesActionTypes.GetTimeZones;
  constructor() {}
}

export class GetTimeZonesSuccessAction implements Action {
  type = TimeZonesActionTypes.GetTimeZonesSuccess;
  constructor(public payload: TimeZone[]) {}
}

export class GetTimeZonesErrorAction implements Action {
  type = TimeZonesActionTypes.GetTimeZonesError;
  constructor(public payload: any) {}
}

export type TimeZonesAction =
  | GetTimeZonesAction
  | GetTimeZonesSuccessAction
  | GetTimeZonesErrorAction;
