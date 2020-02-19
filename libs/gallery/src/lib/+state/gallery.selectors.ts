import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewStateSelector } from '@xpdo/core/xdk';
import { GALLERY_FEATURE_KEY, GalleryState, galleryAdapter } from './gallery.reducer';

const getGalleryState = createFeatureSelector<GalleryState>(
  GALLERY_FEATURE_KEY
);

export const galleryAdapterSelectors = galleryAdapter.getSelectors();

const getGallery = createSelector(
  getGalleryState,
  (state: GalleryState) => galleryAdapterSelectors.selectAll(state)
);

const getLoading = createSelector(
  getGalleryState,
  ViewStateSelector.isLoading
);

const getSaving = createSelector(
  getGalleryState,
  ViewStateSelector.isSaving
)

export const galleryQuery = {
  getGallery,
  getLoading,
  getSaving
};
