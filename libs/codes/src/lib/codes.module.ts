import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '@xpdo/core';
import { TIME_ZONES_FEATURE_KEY, timeZonesReducer } from './+state/time-zones.reducer';
import { SharedModule } from '@msft-aiala/shared';
import { TimeZonesEffects } from './+state/time-zones.effects';
import { TimeZoneSelectionComponent } from './time-zone-selection/time-zone-selection.component';
import { MatSelectModule } from '@angular/material';
import { CodesApiService } from './services/codes-api.service';
import { XpdoLuxonModule } from '@xpdo/luxon';
import { TimeZonesFacade } from './+state/time-zones.facade';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(TIME_ZONES_FEATURE_KEY, timeZonesReducer),
    EffectsModule.forFeature([
      TimeZonesEffects
    ]),
    ApiModule.forFeature(),
    MatSelectModule,
    XpdoLuxonModule
  ],
  declarations: [TimeZoneSelectionComponent],
  providers: [
    CodesApiService,
    TimeZonesFacade
  ],
  entryComponents: [
    TimeZoneSelectionComponent
  ],
  exports: [
    TimeZoneSelectionComponent
  ]
})
export class CodesModule {}
