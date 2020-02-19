import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapSelectorComponent } from './map-selector/map-selector.component';
import { SharedModule } from '@msft-aiala/shared';
import { XpdoIconService } from '@xpdo/components';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { MatAutocompleteModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatAutocompleteModule,
    MatSlideToggleModule
  ],
  declarations: [
    MapSelectorComponent
  ],
  exports: [
    MapSelectorComponent
  ],
  entryComponents: [
    MapSelectorComponent
  ]
})
export class AzureModule {
  constructor(
    iconService: XpdoIconService
  ) {
    iconService.addIcons(
      faMapMarkerAlt
    );
  }
}
