import { RegisterPartialState, RegisterState } from './register.reducer';
import { Registration } from '../models/Registration';
import { registerQuery } from './register.selectors';

describe('RegisterSelectors', () => {
  let storeState: RegisterPartialState;

  const REGISTRATION_EMAIL = 'test@dummy.com';
  const LOADING: any = 'loading';
  const ERROR: any = { error: 'error' };

  beforeEach(() => {
    storeState = {
      register: {
        registration: {
          ...new Registration(),
          email: REGISTRATION_EMAIL
        },
        loading: LOADING,
        error: ERROR,
        registeredUser: null
      } as RegisterState
    }
  });

  it('should get registration', () => {
    const result = registerQuery.getRegistration(storeState);

    expect(result.email).toBe(REGISTRATION_EMAIL);
  });

  it('should get loading', () => {
    const result = registerQuery.getLoading(storeState);

    expect(result).toBe(LOADING);
  });

  it('should get error', () => {
    const result = registerQuery.getError(storeState);

    expect(result).toBe(ERROR.error);
  });
});
