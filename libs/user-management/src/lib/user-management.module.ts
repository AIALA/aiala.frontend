import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRippleModule,
  MatTableModule,
  MatSelectModule
} from '@angular/material';
import {
  faKey,
  faListUl,
  faLock,
  faTh,
  faTrash,
  faUnlock,
  faUserPlus,
  faEnvelope,
  faPencil
} from '@fortawesome/pro-regular-svg-icons';
import {
  faEllipsisV,
  faUser
} from '@fortawesome/pro-solid-svg-icons';
import {
  XpdoButtonModule,
  XpdoDirectivesModule,
  XpdoIconModule,
  XpdoIconService,
  XpdoLayoutModule,
  XpdoProgressModule,
  XpdoToolbarModule
} from '@xpdo/components';
import { XdkCodesModule, XdkPoliciesModule, XdkUserManagementModule } from '@xpdo/core/xdk';

import { PermissionGroupEditComponent } from './permission-group-edit/permission-group-edit.component';
import { PermissionGroupComponent } from './permission-group/permission-group.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserManagementRoutingModule } from './user-management.routing';
import { UserOverviewItemComponent } from './user-overview-item/user-overview-item.component';
import { UserOverviewListComponent } from './user-overview-list/user-overview-list.component';
import { UserOverviewMenuComponent } from './user-overview-menu/user-overview-menu.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { PictureModule } from '@msft-aiala/picture';

@NgModule({
  imports: [
    CommonModule,
    UserManagementRoutingModule,

    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSelectModule,

    ReactiveFormsModule,
    XdkPoliciesModule,
    XpdoButtonModule,
    XpdoDirectivesModule,
    XpdoIconModule,
    XpdoProgressModule,
    XpdoToolbarModule,
    XpdoLayoutModule,
    FlexLayoutModule,
    XdkUserManagementModule,

    XdkCodesModule.forFeature([{ name: 'countries' }]),
    PictureModule
  ],
  declarations: [
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent,
    UserOverviewComponent,
    UserOverviewItemComponent,
    UserOverviewListComponent,
    UserOverviewMenuComponent,
    PermissionGroupComponent,
    PermissionGroupEditComponent
  ],
  entryComponents: [
    UserCreateComponent,
    UserEditComponent,
    PermissionGroupEditComponent
  ]
})
export class UserManagementModule {
  constructor(iconService: XpdoIconService) {
    iconService.addIcons(
      // solid
      faEllipsisV,
      faUser,

      // regular
      faEnvelope,
      faPencil,
      faKey,
      faLock,
      faUnlock,
      faTrash,
      faListUl,
      faTh,
      faUserPlus
    );
  }
}
