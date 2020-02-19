import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery/gallery.component';
import { XpdoMasterDetail } from '@xpdo/components';
import { EditGalleryPictureComponent } from './edit-gallery-picture/edit-gallery-picture.component';
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
    component: GalleryComponent,
    data: {
      viewState: 'master'
    }
  }, {
    path: 'edit/:id',
    component: EditGalleryPictureComponent,
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
export class GalleryRoutingModule {}
