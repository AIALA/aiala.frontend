import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'register' },
      { path: 'register', loadChildren: '@msft-aiala/register#RegisterModule' },
      { path: 'invitation', loadChildren: '@msft-aiala/invitation#InvitationModule' },
      { path: 'password-reset', loadChildren: '@msft-aiala/password-reset#PasswordResetModule' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}
