import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Picture } from '@msft-aiala/picture';
import { IViewState, ViewState } from '@xpdo/core/xdk';
import { GalleryAction, GalleryActionTypes, GetGallerySuccessAction, SavePictureSuccessAction, DeletePictureSuccessAction } from './gallery.actions';

export const GALLERY_FEATURE_KEY = 'gallery';

export interface GalleryState extends EntityState<Picture>, IViewState {
}

export const galleryAdapter: EntityAdapter<Picture> = createEntityAdapter<Picture>();

export interface GalleryPartialState {
  readonly [GALLERY_FEATURE_KEY]: GalleryState;
}

export const initialState: GalleryState = galleryAdapter.getInitialState({
  viewState: null
});

export function galleryReducer(
  state = initialState,
  action: GalleryAction
): GalleryState {
  switch (action.type) {
    case GalleryActionTypes.GetGallery: {
      return {
        ...state,
        viewState: ViewState.Loading
      };
    }

    case GalleryActionTypes.SavePicture: {
      return {
        ...state,
        viewState: ViewState.Saving
      };
    }

    case GalleryActionTypes.GetGallerySuccess: {
      return galleryAdapter.addAll((action as GetGallerySuccessAction).payload, {
        ...state,
        viewState: null
      });
    }

    case GalleryActionTypes.SavePictureSuccess: {
      return galleryAdapter.upsertOne((action as SavePictureSuccessAction).payload, {
        ...state,
        viewState: null
      });
    }

    case GalleryActionTypes.GetGalleryError: {
      return galleryAdapter.removeAll({
        ...state,
        viewState: null
      });
    }

    case GalleryActionTypes.SavePictureError: {
      return {
        ...state,
        viewState: null
      };
    }

    case GalleryActionTypes.DeletePicture: {
      return {
        ...state,
        viewState: ViewState.Saving
      };
    }

    case GalleryActionTypes.DeletePictureError: {
      return galleryAdapter.removeAll({
        ...state,
        viewState: null
      });
    }

    case GalleryActionTypes.DeletePictureSuccess: {
      return galleryAdapter.removeOne((action as DeletePictureSuccessAction).payload, {
        ...state,
        viewState: null
      });
    }
  }

  return state;
}
