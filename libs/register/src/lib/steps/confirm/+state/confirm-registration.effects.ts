import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ConfirmRegistrationActionTypes, ConfirmRegistration, fromConfirmRegistrationActions, ConfirmRegistrationSuccess } from './confirm-registration.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { RegisterApiService } from '../../../services/register-api.service';
import { Router } from '@angular/router';

@Injectable()
export class ConfirmRegistrationEffects {
  @Effect()
  confirm$: Observable<Action> = this.actions$.pipe(
    ofType<ConfirmRegistration>(ConfirmRegistrationActionTypes.ConfirmRegistration),
    map(action => action.payload),
    switchMap(({id, token}) =>
      this.apiService.confirmRegistration(id, { token }).pipe(
        map(result => new fromConfirmRegistrationActions.ConfirmRegistrationSuccess(result)),
        catchError(error => of(new fromConfirmRegistrationActions.ConfirmRegistrationError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  confirmSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<ConfirmRegistrationSuccess>(ConfirmRegistrationActionTypes.ConfirmRegistrationSuccess),
    tap(() => this.router.navigate(['/register/confirm/success']))
  );

  @Effect({ dispatch: false })
  confirmError$: Observable<Action> = this.actions$.pipe(
    ofType<ConfirmRegistrationSuccess>(ConfirmRegistrationActionTypes.ConfirmRegistrationError),
    tap(() => this.router.navigate(['/register/confirm/error']))
  );

  constructor(
    private actions$: Actions,
    private apiService: RegisterApiService,
    private router: Router
  ) {}
}
