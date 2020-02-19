import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmRegistrationActions, ConfirmRegistrationActionTypes } from './confirm-registration.actions';

export const CONFIRM_REGISTRATION_FEATURE_KEY = 'confirm-registration';

export interface ConfirmRegistrationState {
  confirming: boolean;
  confirmed: boolean;
  error: HttpErrorResponse;
}

export interface ConfirmRegistrationPartialState {
  readonly [CONFIRM_REGISTRATION_FEATURE_KEY]: ConfirmRegistrationState;
}

export const initialState: ConfirmRegistrationState = {
  confirming: false,
  confirmed: false,
  error: null
};

export function confirmRegistrationReducer(
  state = initialState,
  action: ConfirmRegistrationActions
): ConfirmRegistrationState {
  switch (action.type) {
    case ConfirmRegistrationActionTypes.ConfirmRegistration: {
      return {
        ...state,
        confirming: true,
        confirmed: false,
        error: null
      };
    }

    case ConfirmRegistrationActionTypes.ConfirmRegistrationSuccess: {
      return {
        ...state,
        confirmed: true,
        confirming: false
      };
    }

    case ConfirmRegistrationActionTypes.ConfirmRegistrationError: {
      return {
        ...state,
        confirmed: false,
        confirming: false,
        error: action.payload
      };
    }
  }

  return state;
}
