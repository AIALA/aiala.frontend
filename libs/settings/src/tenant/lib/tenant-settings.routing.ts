import { Routes, RouterModule } from '@angular/router';
import { TenantSettingsComponent } from './tenant-settings/tenant-settings.component';
import { NgModule } from '@angular/core';
import { CanDeactivateGuard } from '@msft-aiala/shared';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tenant' },
  {
    path: 'tenant',
    component: TenantSettingsComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantSettingsRoutingModule {}
