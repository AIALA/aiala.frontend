import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { XpdoMasterDetail } from '@xpdo/components';
import { PlacesOverviewComponent } from './places-overview/places-overview.component';
import { PlaceEditorComponent } from './place-editor/place-editor.component';
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
    component: PlacesOverviewComponent,
    data: {
      viewState: 'master'
    }
  }, {
    path: 'edit/:id',
    component: PlaceEditorComponent,
    data: {
      viewState: 'detail'
    },
    canDeactivate: [CanDeactivateGuard]
  }, {
    path: 'edit',
    component: PlaceEditorComponent,
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
export class PlacesRoutingModule { }
