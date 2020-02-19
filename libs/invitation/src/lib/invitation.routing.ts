import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvitationRegisterComponent } from './invitation-register/invitation-register.component';
import { InvitationRequestComponent } from './invitation-request/invitation-request.component';
import { InvitationComponent } from './invitation/invitation.component';

const routes: Routes = [
  {
    path: '',
    component: InvitationComponent,
    children: [
      {
        path: 'register',
        component: InvitationRegisterComponent,
        data: {
          state: 'register'
        }
      },
      {
        path: ':id',
        component: InvitationRequestComponent,
        data: {
          state: 'request'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class InvitationRoutingModule {}
