import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBarModule
} from '@angular/material';
import { XpdoProgressModule } from '@xpdo/components';
import { XdkInvitationModule } from '@xpdo/core/xdk';

import { InvitationDeclinedComponent } from './invitation-declined/invitation-declined.component';
import { InvitationRegisterComponent } from './invitation-register/invitation-register.component';
import { InvitationRequestComponent } from './invitation-request/invitation-request.component';
import { InvitationRoutingModule } from './invitation.routing';
import { InvitationComponent } from './invitation/invitation.component';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,

    ReactiveFormsModule,
    FlexModule,
    InvitationRoutingModule,
    XdkInvitationModule.forRoot(),
    XpdoProgressModule
  ],
  declarations: [
    InvitationRequestComponent,
    InvitationRegisterComponent,
    InvitationDeclinedComponent,
    InvitationComponent,
  ],
  entryComponents: [InvitationDeclinedComponent]
})
export class InvitationModule {
  static forRoot(redirectUrl?: string): ModuleWithProviders {
    return {
      ...XdkInvitationModule.forRoot(redirectUrl),
      ngModule: InvitationModule,
    };
  }
}
