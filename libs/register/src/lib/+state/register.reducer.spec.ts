import { registerReducer, initialState, RegisterState } from './register.reducer';
import { UpdateRegistrationAction, SubmitRegistrationErrorAction } from './register.actions';
import { Registration } from '../models/Registration';

describe('ReigsterReducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = registerReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Update registration', () => {
    it('should set registration partial', () => {
      const currentRegistration: Registration = {
        ...initialState.registration,
        lastname: 'Tester',
        password: 'oldPassword'
      };
      const registration: Partial<Registration> = {
        firstname: 'Dummy',
        password: 'newPassword'
      };
      const action = new UpdateRegistrationAction(registration);

      const currentState: RegisterState = {
        ...initialState,
        registration: currentRegistration
      };
      const expectedState: RegisterState = {
        ...initialState,
        registration: {
          ...currentRegistration,
          ...registration
        }
      };

      const result = registerReducer(currentState, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('Submit registration', () => {
    it('should set error and loading', () => {
      const error = 'error' as any;
      const action = new SubmitRegistrationErrorAction(error);

      const currentState: RegisterState = {
        ...initialState,
        loading: 'loading' as any
      };
      const expectedState: RegisterState = {
        ...initialState,
        error: error,
        loading: false
      };

      const result = registerReducer(currentState, action);

      expect(result).toEqual(expectedState);
    });
  });
});
