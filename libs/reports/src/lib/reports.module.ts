import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsOverviewComponent } from './reports-overview/reports-overview.component';
import { SharedModule } from '@msft-aiala/shared';
import { ReportsRoutingModule } from './reports-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '@xpdo/core';
import { REPORT_ACTIVITIES_FEATURE_KEY, reportActivitiesReducer } from './+state/report-activities.reducer';
import { ReportActivitiesEffects } from './+state/report-activities.effects';
import { ReportApiService } from './services/report-api.service';
import { ReportActivitiesFacade } from './+state/report-activities.facade';
import { ReportComponent } from './report/report.component';
import { MatSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ReportsRoutingModule,
    StoreModule.forFeature(REPORT_ACTIVITIES_FEATURE_KEY, reportActivitiesReducer),
    EffectsModule.forFeature([
      ReportActivitiesEffects
    ]),
    ApiModule.forFeature(),
    MatSidenavModule
  ],
  declarations: [
    ReportsOverviewComponent,
    ReportComponent
  ],
  providers: [
    ReportApiService,
    ReportActivitiesFacade
  ]
})
export class ReportsModule {}
