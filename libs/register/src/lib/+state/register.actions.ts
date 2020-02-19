import { Action } from '@ngrx/store';
import { Registration } from '../models/Registration';
import { RegistrationSuccess } from '../models/RegistrationSuccess';
import { HttpErrorResponse } from '@angular/common/http';

export enum RegisterActionTypes {
  UpdateRegistration = '[Register] Update Registration',
  SubmitRegistrationAction = '[Register] Submit Registration',
  SubmitRegistrationSuccessAction = '[Register] Submit Registration Success',
  SubmitRegistrationErrorAction= '[Register] Submit Registration Error',
  ResetRegistration = '[Register] Reset Registration'
}

export class UpdateRegistrationAction implements Action {
  type = RegisterActionTypes.UpdateRegistration;
  constructor(public payload: Partial<Registration>) {}
}

export class SubmitRegistrationAction implements Action {
  type = RegisterActionTypes.SubmitRegistrationAction;
}

export class SubmitRegistrationSuccessAction implements Action {
  type = RegisterActionTypes.SubmitRegistrationSuccessAction;
  constructor(public payload: RegistrationSuccess) {}
}

export class SubmitRegistrationErrorAction implements Action {
  type = RegisterActionTypes.SubmitRegistrationErrorAction;
  constructor(public payload: HttpErrorResponse) {}
}

export class ResetRegistrationAction implements Action {
  type = RegisterActionTypes.ResetRegistration;
  constructor() {}
}

export type RegisterAction =
  | UpdateRegistrationAction
  | SubmitRegistrationAction
  | SubmitRegistrationSuccessAction
  | SubmitRegistrationErrorAction
  | ResetRegistrationAction;
