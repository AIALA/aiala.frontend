import { RegisterApiServiceMock } from '../../../../testing/register-testing.module';
import { Observable, of, throwError } from 'rxjs';
import { ConfirmRegistrationEffects } from './confirm-registration.effects';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RegisterApiService } from '../../../services/register-api.service';
import { fromConfirmRegistrationActions, ConfirmRegistrationSuccess, ConfirmRegistrationError } from './confirm-registration.actions';
import { hot } from 'jasmine-marbles';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

describe('ConfirmRegistrationEffects', () => {
  let apiService: RegisterApiServiceMock;
  let effects: ConfirmRegistrationEffects;
  let router: Router;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        ConfirmRegistrationEffects,
        provideMockActions(() => actions),
        { provide: RegisterApiService, useClass: RegisterApiServiceMock }
      ]
    });

    apiService = TestBed.get(RegisterApiService);
    router = TestBed.get(Router);
    effects = TestBed.get(ConfirmRegistrationEffects);
    spyOn(router, 'navigate').and.callFake(() => Promise.resolve(true));
  });

  describe('confirm$', () => {
    it('should confirm', () => {
      const confirmSuccessModel = 'confirmSuccess' as any;
      apiService.confirmRegistration.and.returnValue(of(confirmSuccessModel));
      actions = hot('-a-|', { a: new fromConfirmRegistrationActions.ConfirmRegistration({id: 'id', token: 'token'}) });

      expect(effects.confirm$).toBeObservable(
        hot('-a-|', { a: new fromConfirmRegistrationActions.ConfirmRegistrationSuccess(confirmSuccessModel) })
      );
    });

    it('should handle error', () => {
      const confirmErrorMessage = 'confirmError' as any;
      apiService.confirmRegistration.and.returnValue(throwError(confirmErrorMessage));
      actions = hot('-a-|', { a: new fromConfirmRegistrationActions.ConfirmRegistration({id: 'id', token: 'token'}) });

      expect(effects.confirm$).toBeObservable(
        hot('-a-|', { a: new fromConfirmRegistrationActions.ConfirmRegistrationError(confirmErrorMessage) })
      );
    });
  });

  describe('confirmSuccess$', () => {
    it('should navigate', () => {
      const action = new ConfirmRegistrationSuccess('confirmSuccess' as any);
      actions = hot('-a-|', { a: action });
      expect(effects.confirmSuccess$).toBeObservable(hot('-a-|', { a: action }));
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['/register/confirm/success']);
    });
  });

  describe('confirmError$', () => {
    it('should redirect to error page', () => {
      const action = new ConfirmRegistrationError(new HttpErrorResponse({}));
      actions = hot('-a-|', { a: action });
      expect(effects.confirmError$).toBeObservable(hot('-a-|', { a: action }));
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['/register/confirm/error']);
    });
  });
});
