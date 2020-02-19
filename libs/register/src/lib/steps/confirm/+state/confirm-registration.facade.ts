import { Injectable } from '@angular/core';
import { ConfirmRegistrationPartialState } from './confirm-registration.reducer';
import { Store } from '@ngrx/store';
import { fromConfirmRegistrationActions } from './confirm-registration.actions';

@Injectable()
export class ConfirmRegistrationFacade {
  constructor(
    private store: Store<ConfirmRegistrationPartialState>
  ) {}

  confirm(id: string, token: string): void {
    this.store.dispatch(new fromConfirmRegistrationActions.ConfirmRegistration({id, token}));
  }
}
