import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@msft-aiala/shared';
import { XdkUserManagementModule } from '@xpdo/core/xdk';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    XdkUserManagementModule,
    MatCheckboxModule
  ],
  declarations: [
    UserSelectorComponent
  ],
  exports: [
    UserSelectorComponent
  ]
})
export class UserControlsModule {}
