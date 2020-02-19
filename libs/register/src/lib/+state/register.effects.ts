import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  switchMap,
  withLatestFrom,
  map,
  catchError, tap
} from 'rxjs/operators';
import { Action } from '@ngrx/store';
import {
  RegisterActionTypes,
  SubmitRegistrationSuccessAction,
  SubmitRegistrationAction,
  SubmitRegistrationErrorAction,
  ResetRegistrationAction
} from './register.actions';
import { RegisterFacade } from './register.facade';
import { Injectable } from '@angular/core';
import { RegisterApiService } from '../services/register-api.service';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffects {
  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType<SubmitRegistrationAction>(RegisterActionTypes.SubmitRegistrationAction),
    withLatestFrom(this.facade.registration$),
    switchMap(([action, registration]) =>
      this.api.register(registration).pipe(
        map(result => new SubmitRegistrationSuccessAction(result)),
        catchError(error => of(new SubmitRegistrationErrorAction(error)))
      )
    )
  );

  @Effect()
  registerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<SubmitRegistrationSuccessAction>(RegisterActionTypes.SubmitRegistrationSuccessAction),
    tap(() => { this.router.navigate(['/register/complete']) }),
    map(() => new ResetRegistrationAction())
  );

  constructor(
    private actions$: Actions,
    private facade: RegisterFacade,
    private api: RegisterApiService,
    private router: Router
  ) { }
}
