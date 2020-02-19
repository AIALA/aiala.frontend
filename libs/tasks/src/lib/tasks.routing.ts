import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CanDeactivateGuard } from '@msft-aiala/shared';
import { XpdoMasterDetail } from '@xpdo/components';
import { TasksOverviewComponent } from './tasks-overview/tasks-overview.component';
import { TaskEditorComponent } from './task-editor/task-editor.component';

const routes: Routes = [{
  path: '',
  component: XpdoMasterDetail,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview'
  }, {
    path: 'overview',
    component: TasksOverviewComponent,
    data: {
      viewState: 'master'
    }
  }, {
    path: 'edit/:id',
    component: TaskEditorComponent,
    data: {
      viewState: 'detail'
    },
    canDeactivate: [CanDeactivateGuard]
  }, {
    path: 'edit',
    component: TaskEditorComponent,
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
export class TasksRoutingModule { }
