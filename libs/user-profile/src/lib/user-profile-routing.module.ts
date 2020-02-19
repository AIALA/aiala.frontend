import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileOverviewComponent } from './user-profile-overview/user-profile-overview.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: UserProfileOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {}
