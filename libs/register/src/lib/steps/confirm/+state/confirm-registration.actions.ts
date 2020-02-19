import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { ConfirmRegistrationSuccessModel } from '../../../models/ConfirmRegistrationSuccessModel';

export enum ConfirmRegistrationActionTypes {
  ConfirmRegistration = '[ConfirmRegistration] confirm registration',
  ConfirmRegistrationSuccess = '[ConfirmRegistration] confirm registration success',
  ConfirmRegistrationError = '[ConfirmRegistration] confirm registration error'
}
export class ConfirmRegistration implements Action {
  readonly type = ConfirmRegistrationActionTypes.ConfirmRegistration;
  constructor(public payload: { id: string, token: string }) { }
}

export class ConfirmRegistrationSuccess implements Action {
  readonly type = ConfirmRegistrationActionTypes.ConfirmRegistrationSuccess;
  constructor(public payload: ConfirmRegistrationSuccessModel) { }
}

export class ConfirmRegistrationError implements Action {
  readonly type = ConfirmRegistrationActionTypes.ConfirmRegistrationError;
  constructor(public payload: HttpErrorResponse) { }
}

export type ConfirmRegistrationActions =
  | ConfirmRegistration
  | ConfirmRegistrationSuccess
  | ConfirmRegistrationError;

export const fromConfirmRegistrationActions = {
  ConfirmRegistration,
  ConfirmRegistrationSuccess,
  ConfirmRegistrationError
};
