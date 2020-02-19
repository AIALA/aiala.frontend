import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { galleryReducer, GALLERY_FEATURE_KEY } from './+state/gallery.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '@xpdo/core';
import { GalleryEffects } from './+state/gallery.effects';
import { SharedModule } from '@msft-aiala/shared';
import { PictureModule } from '@msft-aiala/picture';
import { GalleryApiService } from './services/gallery-api.service';
import { GalleryFacade } from './+state/gallery.facade';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryRoutingModule } from './gallery.routing';
import { GalleryPictureCardComponent } from './gallery-picture-card/gallery-picture-card.component';
import { XpdoDirectivesModule, XpdoIconService } from '@xpdo/components';
import { MatMenuModule } from '@angular/material';
import { faEllipsisV, faSave } from '@fortawesome/pro-solid-svg-icons';
import { faTrash, faPlus, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { EditGalleryPictureComponent } from './edit-gallery-picture/edit-gallery-picture.component';
import { EditGalleryTagComponent } from './edit-gallery-tag/edit-gallery-tag.component';
import { ConfidenceHintComponent } from './confidence-hint/confidence-hint.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(GALLERY_FEATURE_KEY, galleryReducer),
    EffectsModule.forFeature([
      GalleryEffects
    ]),
    ApiModule.forFeature(),
    GalleryRoutingModule,
    PictureModule,
    XpdoDirectivesModule,
    MatMenuModule
  ],
  providers: [
    GalleryApiService,
    GalleryFacade
  ],
  declarations: [GalleryComponent, GalleryPictureCardComponent, EditGalleryPictureComponent, EditGalleryTagComponent, ConfidenceHintComponent]
})
export class GalleryModule {
  constructor(
    iconService: XpdoIconService
  ) {
    iconService.addIcons(
      faEllipsisV,
      faSave,
      faTrash,
      faTrashAlt,
      faPlus
    )
  }
}
