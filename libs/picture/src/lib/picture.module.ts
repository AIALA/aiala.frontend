import { NgModule } from '@angular/core';
import { TakePictureDialogComponent } from './take-picture-dialog/take-picture-dialog.component';
import { MatMenuModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';
import { SharedModule } from '@msft-aiala/shared';
import { CommonModule } from '@angular/common';
import { XpdoCropperModule, XpdoMenuModule, XpdoIconModule, XpdoIconService } from '@xpdo/components';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { faUpload, faCamera, faSave, faImage, faPencil } from '@fortawesome/pro-regular-svg-icons';
import { PicturesApiService } from './services/pictures-api.service';
import { ViewPictureDialogComponent } from './view-picture-dialog/view-picture-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatStepperModule,
    XpdoCropperModule,
    MatMenuModule,
    XpdoMenuModule,
    MatProgressSpinnerModule,
    XpdoIconModule
  ],
  entryComponents: [
    TakePictureDialogComponent,
    ThumbnailComponent,
    ViewPictureDialogComponent
  ],
  providers: [
    PicturesApiService
  ],
  declarations: [
    TakePictureDialogComponent,
    ThumbnailComponent,
    ViewPictureDialogComponent
  ],
  exports: [
    ThumbnailComponent
  ]
})
export class PictureModule {
  constructor(iconService: XpdoIconService) {
    iconService.addIcons(
      faUpload,
      faCamera,
      faSave,
      faImage,
      faPencil
    )
  }
}
