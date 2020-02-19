import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LanguageComponent } from './steps/language/language.component';
import { AccountDetailsComponent } from './steps/account-details/account-details.component';
import { CompleteComponent } from './steps/complete/complete.component';

const routes: Routes = [{
  path: '',
  component: RegisterComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'language'
  }, {
    path: 'language',
    component: LanguageComponent,
    data: {
      state: 'language'
    }
  }, {
    path: 'account-details',
    component: AccountDetailsComponent,
    data: {
      state: 'account-details'
    }
  }, {
    path: 'confirm',
    loadChildren: './steps/confirm/confirm.module#ConfirmRegistrationModule'
  }, {
    path: 'complete',
    component: CompleteComponent,
    data: {
      state: 'complete'
    }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
