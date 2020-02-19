import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRippleModule,
  MatTableModule
} from '@angular/material';
import {
  XpdoButtonModule,
  XpdoDirectivesModule,
  XpdoLayoutModule,
  XpdoProgressModule,
  XpdoToolbarModule
} from '@xpdo/components';
import { XdkPasswordResetModule } from '@xpdo/core/xdk';

import { CompleteComponent } from './complete/complete.component';
import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [RequestComponent, CompleteComponent],
  imports: [
    CommonModule,
    XdkPasswordResetModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatRippleModule,

    ReactiveFormsModule,
    XpdoButtonModule,
    XpdoDirectivesModule,
    XpdoProgressModule,
    XpdoToolbarModule,
    XpdoLayoutModule,
    FlexLayoutModule,
    PasswordResetRoutingModule
  ],
})
export class PasswordResetModule {}
