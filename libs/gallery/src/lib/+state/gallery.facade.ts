import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture } from '@msft-aiala/picture';
import { select, Store } from '@ngrx/store';
import { galleryQuery } from './gallery.selectors';
import { GalleryPartialState } from './gallery.reducer';
import { GetGalleryAction, SavePictureAction, DeletePictureAction } from './gallery.actions';
import { UpdateAiPictureMetadataModel } from '../models/UpdateAiPictureMetadataModel';

@Injectable()
export class GalleryFacade {
  gallery$: Observable<Picture[]> = this.store.pipe(select(galleryQuery.getGallery));
  loading$: Observable<boolean> = this.store.pipe(select(galleryQuery.getLoading));
  saving$: Observable<boolean> = this.store.pipe(select(galleryQuery.getSaving));

  constructor(
    private store: Store<GalleryPartialState>
  ) { }

  loadGallery(): void {
    this.store.dispatch(new GetGalleryAction());
  }

  savePicture(id: string, picture: UpdateAiPictureMetadataModel): void {
    this.store.dispatch(new SavePictureAction({id: id, model: picture}));
  }

  deletePicture(id: string): void {
    this.store.dispatch(new DeletePictureAction(id));
  }
}
