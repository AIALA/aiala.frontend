import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ConfirmRegistrationErrorComponent } from './confirm-registration-error/confirm-registration-error.component';
import { ConfirmRegistrationSuccessComponent } from './confirm-registration-success/confirm-registration-success.component';

const routes: Routes = [{
  path: 'success',
  component: ConfirmRegistrationSuccessComponent
}, {
  path: 'error',
  component: ConfirmRegistrationErrorComponent
}, {
  path: ':id',
  component: ConfirmRegistrationComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfirmRegistrationRoutingModule {}
