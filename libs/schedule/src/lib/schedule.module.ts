import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleOverviewComponent } from './schedule-overview/schedule-overview.component';
import { ScheduleApiService } from './services/schedule-api.service';
import { EffectsModule } from '@ngrx/effects';
import { ScheduleEffects } from './+state/schedule.effects';
import { StoreModule } from '@ngrx/store';
import { SCHEDULE_FEATURE_KEY, scheduleReducer } from './+state/schedule.reducer';
import { ApiModule } from '@xpdo/core';
import { ScheduleFacade } from './+state/schedule.facade';
import { ScheduleRoutingModule } from './schedule.routing';
import { XpdoLayoutModule, XpdoIconService, XpdoIconModule } from '@xpdo/components';
import { MatMenuModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { FlexModule } from '@angular/flex-layout';
import { EditDayComponent } from './edit-day/edit-day.component';
import { SharedModule } from '@msft-aiala/shared';
import { EditDayScheduleComponent } from './edit-day-schedule/edit-day-schedule.component';
import { EditDayTasksComponent } from './edit-day-tasks/edit-day-tasks.component';
import { TasksModule } from '@msft-aiala/tasks';
import { EditDayTaskDialogComponent } from './edit-day-task-dialog/edit-day-task-dialog.component';
import { XpdoLuxonModule } from '@xpdo/luxon';
import { ErrorModule } from '@msft-aiala/error';
import { DAY_TEMPLATES_FEATURE_KEY, dayTemplatesReducer } from './+state/day-templates/day-templates.reducer';
import { DayTemplatesEffects } from './+state/day-templates/day-templates.effects';
import { DayTemplatesFacade } from './+state/day-templates/day-templates.facade';
import { DayTemplatesOverviewComponent } from './day-templates-overview/day-templates-overview.component';
import { DayTemplateCardComponent } from './day-template-card/day-template-card.component';
import { CreateTemplateDialogComponent } from './create-template-dialog/create-template-dialog.component';
import { faChevronDoubleLeft, faTrash, faPlus, faLayerPlus, faArrowRight, faFileAlt } from '@fortawesome/pro-regular-svg-icons';
import { faEllipsisV, faSave, faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { DocumentsModule } from '@msft-aiala/documents';
import { SettingsModule } from '@msft-aiala/settings';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    XpdoLayoutModule,
    MatToolbarModule,
    EffectsModule.forFeature([ScheduleEffects, DayTemplatesEffects]),
    StoreModule.forFeature(SCHEDULE_FEATURE_KEY, scheduleReducer),
    StoreModule.forFeature(DAY_TEMPLATES_FEATURE_KEY, dayTemplatesReducer),
    ApiModule.forFeature(),
    ScheduleRoutingModule,
    FlexModule,
    TasksModule,
    MatMenuModule,
    XpdoLuxonModule,
    ErrorModule,
    MatTabsModule,
    XpdoIconModule,
    DocumentsModule,
    SettingsModule
  ],
  providers: [
    ScheduleApiService,
    ScheduleFacade,
    DayTemplatesFacade
  ],
  entryComponents: [
    EditDayTaskDialogComponent,
    CreateTemplateDialogComponent
  ],
  declarations: [
    ScheduleOverviewComponent,
    EditDayComponent,
    EditDayScheduleComponent,
    EditDayTasksComponent,
    EditDayTaskDialogComponent,
    DayTemplatesOverviewComponent,
    DayTemplateCardComponent,
    CreateTemplateDialogComponent
  ]
})
export class ScheduleModule {
  constructor(iconService: XpdoIconService) {
    iconService.addIcons(
      faEllipsisV,
      faChevronDoubleLeft,
      faTrash,
      faPlus,
      faSave,
      faLayerPlus,
      faArrowRight,
      faArrowLeft,
      faFileAlt
    );
  }
}
