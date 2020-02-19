import { XpdoIconService, XpdoLayoutModule, XpdoIconModule } from '@xpdo/components';
import { faSave } from '@fortawesome/pro-regular-svg-icons';
import { NgModule } from '@angular/core';
import { TenantSettingsComponent } from './tenant-settings/tenant-settings.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@msft-aiala/shared';
import { SettingsModule } from '@msft-aiala/settings';
import { TenantSettingsRoutingModule } from './tenant-settings.routing';
import { UserControlsModule } from '@msft-aiala/user-controls';
import { PlacesModule } from '@msft-aiala/places';
import { MatExpansionModule, MatSelectModule } from '@angular/material';
import { CodesModule } from '@msft-aiala/codes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SettingsModule,
    TenantSettingsRoutingModule,
    UserControlsModule,
    XpdoLayoutModule,
    XpdoIconModule,
    PlacesModule,
    MatExpansionModule,
    CodesModule,
    MatSelectModule
  ],
  declarations: [
    TenantSettingsComponent
  ]
})
export class TenantSettingsModule {
  constructor(
    iconService: XpdoIconService
  ) {
    iconService.addIcons(
      faSave
    );
  }
}
