import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { DayTemplate } from '../../models/DayTemplate';

export enum DayTemplatesActionTypes {
  CreateDayTemplate = '[day templates] Create Day Template',
  CreateDayTemplateSuccess = '[day templates] Create Day Template Success',
  CreateDayTemplateError = '[day templates] Create Day Template Error',

  GetDayTemplates = '[day templates] Get Day Templates',
  GetDayTemplatesSuccess = '[day templates] Get Day Templates Success',
  GetDayTemplatesError = '[day templates] Get Day Templates Error',

  DeleteDayTemplate = '[day templates] Delete Day Template',
  DeleteDayTemplateSuccess = '[day templates] Delete Day Template Success',
  DeleteDayTemplateError = '[day templates] Delete Day Template Error',
}

export class CreateDayTemplateAction implements Action {
  type = DayTemplatesActionTypes.CreateDayTemplate;
  constructor(public payload: DayTemplate) {}
}

export class CreateDayTemplateSuccessAction implements Action {
  type = DayTemplatesActionTypes.CreateDayTemplateSuccess;
}

export class CreateDayTemplateErrorAction implements Action {
  type = DayTemplatesActionTypes.CreateDayTemplateError;
  constructor(public error: HttpErrorResponse) {}
}

export class GetDayTemplatesAction implements Action {
  type = DayTemplatesActionTypes.GetDayTemplates;
}

export class GetDayTemplatesSuccessAction implements Action {
  type = DayTemplatesActionTypes.GetDayTemplatesSuccess;
  constructor(public payload: DayTemplate[]) {}
}

export class GetDayTemplatesErrorAction implements Action {
  type = DayTemplatesActionTypes.GetDayTemplatesError;
  constructor(public error: HttpErrorResponse) {}
}

export class DeleteDayTemplateAction implements Action {
  type = DayTemplatesActionTypes.DeleteDayTemplate;
  constructor(public payload: string) {}
}

export class DeleteDayTemplateSuccessAction implements Action {
  type = DayTemplatesActionTypes.DeleteDayTemplateSuccess;
}

export class DeleteDayTemplateErrorAction implements Action {
  type = DayTemplatesActionTypes.DeleteDayTemplateError;
  constructor(public error: HttpErrorResponse) {}
}

export type DayTemplatesAction =
  | CreateDayTemplateAction
  | CreateDayTemplateSuccessAction
  | CreateDayTemplateErrorAction
  | GetDayTemplatesAction
  | GetDayTemplatesSuccessAction
  | GetDayTemplatesErrorAction
  | DeleteDayTemplateAction
  | DeleteDayTemplateSuccessAction
  | DeleteDayTemplateErrorAction;
