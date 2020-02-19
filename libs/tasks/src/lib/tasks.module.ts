import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksOverviewComponent } from './tasks-overview/tasks-overview.component';
import { SharedModule } from '@msft-aiala/shared';
import { TasksRoutingModule } from './tasks.routing';
import { XpdoDirectivesModule, XpdoIconService } from '@xpdo/components';
import { TasksFacade } from './+state/tasks.facade';
import { TasksApiService } from './services/tasks-api.service';
import { StoreModule } from '@ngrx/store';
import { TASKS_FEATURE_KEY, tasksReducer } from './+state/tasks.reducer';
import { TasksEffects } from './+state/tasks.effects';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '@xpdo/core';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskEditorComponent } from './task-editor/task-editor.component';
import { MatInputModule, MatMenuModule, MatTabsModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { TaskStepEditorComponent } from './task-step-editor/task-step-editor.component';
import { PictureModule } from '@msft-aiala/picture';
import { XpdoLuxonModule } from '@xpdo/luxon';
import { faSave, faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import { faPlus, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { PlacesModule } from '@msft-aiala/places';
import { ErrorModule } from '@msft-aiala/error';
import { UserControlsModule } from '@msft-aiala/user-controls';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule,
    XpdoDirectivesModule,
    StoreModule.forFeature(TASKS_FEATURE_KEY, tasksReducer),
    EffectsModule.forFeature([
      TasksEffects
    ]),
    ApiModule.forFeature(),
    MatMenuModule,
    MatInputModule,
    PictureModule,
    XpdoLuxonModule,
    PlacesModule,
    ErrorModule,
    MatTabsModule,
    MatSelectModule,
    UserControlsModule,
    MatSlideToggleModule
  ],
  declarations: [
    TasksOverviewComponent,
    TaskCardComponent,
    TaskEditorComponent,
    TaskStepEditorComponent
  ],
  entryComponents: [
    TaskCardComponent
  ],
  exports: [
    TaskCardComponent
  ],
  providers: [
    TasksFacade,
    TasksApiService
  ]
})
export class TasksModule {
  constructor(iconService: XpdoIconService) {
    iconService.addIcons(
      faSave,
      faEllipsisV,
      faPlus,
      faTrashAlt
    )
  }
}
