import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterState, REGISTER_FEATURE_KEY } from './register.reducer';

const getRegisterState = createFeatureSelector<RegisterState>(REGISTER_FEATURE_KEY);

const getRegistration = createSelector(
  getRegisterState,
  state => state.registration
);

const getLoading = createSelector(
  getRegisterState,
  state => state.loading
);

const getRegisteredUser = createSelector(
  getRegisterState,
  (state: RegisterState) => state.registeredUser
);

const getError = createSelector(
  getRegisterState,
  (state: RegisterState) => state.error && state.error.error
);

const getGeneralError = createSelector(
  getError,
  (state: any) => state && state['@general']
);

export const registerQuery = {
  getRegistration,
  getLoading,
  getError,
  getGeneralError,
  getRegisteredUser
};
