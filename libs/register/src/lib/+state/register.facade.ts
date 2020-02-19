import { Injectable } from '@angular/core';
import { RegisterPartialState } from './register.reducer';
import { Store, select } from '@ngrx/store';
import { registerQuery } from './register.selectors';
import { UpdateRegistrationAction, SubmitRegistrationAction } from './register.actions';
import { Registration } from '../models/Registration';

@Injectable()
export class RegisterFacade {
  registration$ = this.store.pipe(select(registerQuery.getRegistration));
  loading$ = this.store.pipe(select(registerQuery.getLoading));
  error$ = this.store.pipe(select(registerQuery.getError));
  generalError$ = this.store.pipe(select(registerQuery.getGeneralError));
  registeredUser$ = this.store.pipe(select(registerQuery.getRegisteredUser));

  constructor(
    private store: Store<RegisterPartialState>
  ) {}

  updateRegistration(data: Partial<Registration>) {
    this.store.dispatch(new UpdateRegistrationAction(data));
  }

  submitRegistration() {
    this.store.dispatch(new SubmitRegistrationAction());
  }
}
