import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesOverviewComponent } from './places-overview/places-overview.component';
import { SharedModule } from '@msft-aiala/shared';
import { PlacesRoutingModule } from './places.routing';
import { PlaceCardComponent } from './place-card/place-card.component';
import { PlacesEffects } from './+state/places.effects';
import { PlacesFacade } from './+state/places.facade';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '@xpdo/core';
import { PLACES_FEATURE_KEY, placesReducer } from './+state/places.reducer';
import { PictureModule } from '@msft-aiala/picture';
import { MatMenuModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { XpdoDirectivesModule, XpdoIconService } from '@xpdo/components';
import { PlaceEditorComponent } from './place-editor/place-editor.component';
import { PlacesApiService } from './services/places-api.service';
import { faPlus, faTrash, faLocation, faMapMarkerAlt } from '@fortawesome/pro-regular-svg-icons';
import { faSave, faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import { AzureModule } from '@msft-aiala/azure';
import { PlaceSelectorComponent } from './place-selector/place-selector.component';
import { PlaceAutocompleteComponent } from './place-autocomplete/place-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlacesRoutingModule,
    StoreModule.forFeature(PLACES_FEATURE_KEY, placesReducer),
    EffectsModule.forFeature([
      PlacesEffects
    ]),
    ApiModule.forFeature(),
    PictureModule,
    MatMenuModule,
    XpdoDirectivesModule,
    AzureModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  providers: [
    PlacesEffects,
    PlacesFacade,
    PlacesApiService
  ],
  declarations: [
    PlacesOverviewComponent,
    PlaceCardComponent,
    PlaceEditorComponent,
    PlaceSelectorComponent,
    PlaceAutocompleteComponent
  ],
  exports: [
    PlaceSelectorComponent,
    PlaceAutocompleteComponent
  ],
  entryComponents: [
    PlaceSelectorComponent,
    PlaceAutocompleteComponent
  ]
})
export class PlacesModule {
  constructor(
    iconService: XpdoIconService
  ) {
    iconService.addIcons(
      faPlus,
      faSave,
      faTrash,
      faEllipsisV,
      faLocation,
      faMapMarkerAlt
    )
  }
}
