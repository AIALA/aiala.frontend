import { NgModule } from '@angular/core';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ConfirmRegistrationErrorComponent } from './confirm-registration-error/confirm-registration-error.component';
import { ConfirmRegistrationSuccessComponent } from './confirm-registration-success/confirm-registration-success.component';
import { CommonModule } from '@angular/common';
import { ConfirmRegistrationRoutingModule } from './confirm.routing';
import { SharedModule } from '@msft-aiala/shared';
import { ConfirmRegistrationFacade } from './+state/confirm-registration.facade';
import { StoreModule } from '@ngrx/store';
import { CONFIRM_REGISTRATION_FEATURE_KEY, confirmRegistrationReducer, initialState } from './+state/confirm-registration.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConfirmRegistrationEffects } from './+state/confirm-registration.effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfirmRegistrationRoutingModule,
    StoreModule.forFeature(CONFIRM_REGISTRATION_FEATURE_KEY, confirmRegistrationReducer, {
      initialState
    }),
    EffectsModule.forFeature([
      ConfirmRegistrationEffects
    ])
  ],
  declarations: [
    ConfirmRegistrationComponent,
    ConfirmRegistrationErrorComponent,
    ConfirmRegistrationSuccessComponent
  ],
  providers: [
    ConfirmRegistrationFacade
  ]
})
export class ConfirmRegistrationModule { }
