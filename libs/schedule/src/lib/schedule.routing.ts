import { RouterModule, Routes } from '@angular/router';
import { XpdoMasterDetail } from '@xpdo/components';
import { ScheduleOverviewComponent } from './schedule-overview/schedule-overview.component';
import { NgModule } from '@angular/core';
import { EditDayComponent } from './edit-day/edit-day.component';
import { CanDeactivateGuard } from '@msft-aiala/shared';

const routes: Routes = [{
  path: '',
  component: XpdoMasterDetail,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview'
  }, {
    path: 'overview',
    component: ScheduleOverviewComponent,
    data: {
      viewState: 'master'
    }
  }, {
    path: 'day/:isoDate',
    component: EditDayComponent,
    data: {
      viewState: 'detail'
    },
    canDeactivate: [CanDeactivateGuard]
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ScheduleRoutingModule { }
