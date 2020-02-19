import { ImageCropperModule } from 'ngx-image-cropper';

import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatTabsModule
} from '@angular/material';
import { faBuilding } from '@fortawesome/pro-light-svg-icons/faBuilding';
import { faHome } from '@fortawesome/pro-light-svg-icons/faHome';
import { faUsers } from '@fortawesome/pro-light-svg-icons/faUsers';
import { faLayerGroup } from '@fortawesome/pro-light-svg-icons/faLayerGroup';
import { faCog } from '@fortawesome/pro-regular-svg-icons/faCog';
import { faKey } from '@fortawesome/pro-regular-svg-icons/faKey';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
import { faSignOut } from '@fortawesome/pro-regular-svg-icons/faSignOut';
import { faLanguage } from '@fortawesome/pro-regular-svg-icons/faLanguage';
import { faTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { faUserCog } from '@fortawesome/pro-regular-svg-icons/faUserCog';
import { faCamera } from '@fortawesome/pro-solid-svg-icons/faCamera';
import { faPencil } from '@fortawesome/pro-solid-svg-icons/faPencil';
import {
  XpdoCropperModule,
  XpdoIconModule,
  XpdoIconService,
  XpdoLayoutModule,
  XpdoMenuModule,
  XpdoProgressModule,
  XpdoToolbarModule
} from '@xpdo/components';

import { AccountsDialogComponent } from './accounts-dialog/accounts-dialog.component';
import { CaptureImageDialogComponent } from './capture-image-dialog/capture-image-dialog.component';
import { UpdatePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { UserProfileChangeAvatarDialogComponent } from './change-profile-picture-dialog/change-profile-picture-dialog';
import { ProfilePictureDialogComponent } from './profile-picture-dialog/profile-picture-dialog.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { UpdateProfileDialogComponent } from './update-profile-dialog/update-profile-dialog.component';
import { UserProfileExpandableComponent } from './user-profile-expandable/user-profile-expandable.component';
import { UserProfileMenuComponent } from './user-profile-menu/user-profile-menu.component';
import { UserProfileOverviewComponent } from './user-profile-overview/user-profile-overview.component';
import { UserProfilePanelComponent } from './user-profile-panel/user-profile-panel.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileSettingsOverviewDialogComponent } from './user-profile-settings-overview-component/user-profile-settings-overview-dialog.component';
import { XpdoLuxonModule } from '@xpdo/luxon';
import { PictureModule } from '@msft-aiala/picture';
import { XdkUserProfileModule } from '@xpdo/core/xdk';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ImageCropperModule,

    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,

    XpdoCropperModule,
    XpdoIconModule,
    XpdoMenuModule,
    XpdoLayoutModule,
    XpdoProgressModule,
    XpdoToolbarModule,
    XdkUserProfileModule,

    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    XpdoLuxonModule,
    PictureModule
  ],
  declarations: [
    UpdatePasswordDialogComponent,
    ProfilePictureComponent,
    ProfilePictureDialogComponent,
    AccountsDialogComponent,
    UpdateProfileDialogComponent,
    UserProfileChangeAvatarDialogComponent,
    UserProfileExpandableComponent,
    UserProfileMenuComponent,
    UserProfileOverviewComponent,
    UserProfilePanelComponent,
    UserProfileSettingsOverviewDialogComponent,
    CaptureImageDialogComponent
  ],
  exports: [UserProfilePanelComponent],
  entryComponents: [
    UpdatePasswordDialogComponent,
    AccountsDialogComponent,
    UpdateProfileDialogComponent,
    UserProfileChangeAvatarDialogComponent,
    UserProfileSettingsOverviewDialogComponent,
    CaptureImageDialogComponent,
    ProfilePictureDialogComponent
  ]
})
export class UserProfileModule {
  constructor(iconService: XpdoIconService) {
    iconService.addIcons(
      // solid
      faPencil,
      faCamera,

      // regular
      faCog,
      faUserCog,
      faKey,
      faSearch,
      faSignOut,
      faTimes,
      faLanguage,

      // light
      faBuilding,
      faHome,
      faLayerGroup,
      faUsers
    );
  }

  static forRoot(excludeAccountHeader?: string[]): ModuleWithProviders {
    return {
      providers: [
        ...XdkUserProfileModule.forRoot(excludeAccountHeader).providers
      ],
      ngModule: UserProfileModule
    };
  }
}
