import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteComponent } from './complete/complete.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path: '', redirectTo: 'request', pathMatch: 'full' },
  { path: 'request', component: RequestComponent },
  { path: 'complete', pathMatch: 'full', component: CompleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule {}
