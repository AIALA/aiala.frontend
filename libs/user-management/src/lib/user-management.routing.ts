import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XpdoMasterDetail } from '@xpdo/components';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';

const routes: Routes = [
  {
    path: '',
    component: XpdoMasterDetail,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      {
        path: 'overview',
        component: UserOverviewComponent,
        data: {
          viewState: 'master'
        }
      },
      {
        path: ':id',
        component: UserDetailComponent,
        data: {
          viewState: 'detail'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class UserManagementRoutingModule { }
