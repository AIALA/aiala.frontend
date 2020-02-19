import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XpdoMasterDetail } from '@xpdo/components';
import { ReportsOverviewComponent } from './reports-overview/reports-overview.component';

const routes: Routes = [{
  path: '',
  component: XpdoMasterDetail,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview'
  }, {
    path: 'overview',
    component: ReportsOverviewComponent,
    data: {
      viewState: 'master'
    }
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
export class ReportsRoutingModule {}
