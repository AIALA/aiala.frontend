import { RegisterEffects } from './register.effects';
import { SubmitRegistrationAction, SubmitRegistrationSuccessAction, SubmitRegistrationErrorAction } from './register.actions';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RegisterApiService } from '../services/register-api.service';
import { RegisterApiServiceMock, RegisterFacadeMock } from '../../testing/register-testing.module';
import { RegisterFacade } from './register.facade';
import { hot } from '@nrwl/nx/testing';
import { RegistrationSuccess } from '../models/RegistrationSuccess';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterEffects', () => {
  let effects: RegisterEffects;
  let actions: Observable<any>;
  let apiMock: RegisterApiServiceMock;
  let facadeMock: RegisterFacadeMock;

  beforeEach(() => {
    facadeMock = new RegisterFacadeMock();
    facadeMock.registration$ = of('registration' as any) as any;

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        RegisterEffects,
        provideMockActions(() => actions),
        { provide: RegisterApiService, useClass: RegisterApiServiceMock },
        { provide: RegisterFacade, useValue: facadeMock }
      ]
    });

    apiMock = TestBed.get(RegisterApiService);
    effects = TestBed.get(RegisterEffects);
  });

  describe('register$', () => {
    it('should call api service', () => {
      const successValue = {
        email: 'success email',
        id: 'success id',
        status: 'success'
      } as RegistrationSuccess;
      apiMock.register.and.returnValue(of(successValue));
      actions = hot('-a-|', { a: new SubmitRegistrationAction() });

      expect(effects.register$).toBeObservable(
        hot('-a-|', { a: new SubmitRegistrationSuccessAction(successValue) })
      );
    });

    it('should handle error', () => {
      const errorValue = 'error' as any;
      apiMock.register.and.returnValue(throwError(errorValue));
      actions = hot('-a-|', { a: new SubmitRegistrationAction() });

      expect(effects.register$).toBeObservable(
        hot('-a-|', { a: new SubmitRegistrationErrorAction(errorValue) })
      );
    });
  });
});
