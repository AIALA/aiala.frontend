import { Registration } from '../models/Registration';
import {
  RegisterAction,
  RegisterActionTypes,
  SubmitRegistrationErrorAction, SubmitRegistrationSuccessAction,
  UpdateRegistrationAction
} from './register.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrationSuccess } from '../models/RegistrationSuccess';

export const REGISTER_FEATURE_KEY = 'register';

export interface RegisterState {
  registration: Registration;
  registeredUser: RegistrationSuccess;
  loading: boolean;
  error: HttpErrorResponse;
}

export interface RegisterPartialState {
  readonly [REGISTER_FEATURE_KEY]: RegisterState;
}

export const initialState: RegisterState = {
  registration: {} as any,
  registeredUser: {} as any,
  loading: false,
  error: null
};

export function registerReducer(
  state: RegisterState = initialState,
  action: RegisterAction
): RegisterState {
  switch (action.type) {
    case RegisterActionTypes.UpdateRegistration: {
      return {
        ...state,
        registration: {
          ...state.registration,
          ...(action as UpdateRegistrationAction).payload
        }
      };
    }

    case RegisterActionTypes.SubmitRegistrationAction: {
      return {
        ...state,
        loading: true
      };
    }

    case RegisterActionTypes.SubmitRegistrationSuccessAction: {
      return {
        ...state,
        registeredUser: (action as SubmitRegistrationSuccessAction).payload,
        loading: false
      };
    }

    case RegisterActionTypes.SubmitRegistrationErrorAction: {
      return {
        ...state,
        error: (action as SubmitRegistrationErrorAction).payload,
        loading: false
      }
    }

    case RegisterActionTypes.ResetRegistration: {
      return {
        ...state,
        registration: initialState.registration
      }
    }
  }

  return state;
}
