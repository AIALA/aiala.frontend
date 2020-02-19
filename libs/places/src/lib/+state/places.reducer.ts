import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Place } from '../models/Place';
import { IViewState, ViewState } from '@xpdo/core/xdk';
import { PlacesAction, PlacesActionTypes, GetPlacesSuccessAction, SavePlaceSuccessAction, DeletePlaceSuccessAction } from './places.actions';

export const PLACES_FEATURE_KEY = 'places';

export interface PlacesState extends EntityState<Place>, IViewState {
}

export const placeAdapter: EntityAdapter<Place> = createEntityAdapter<Place>();

export interface PlacesPartialState {
  readonly [PLACES_FEATURE_KEY]: PlacesState;
}

export const initialState: PlacesState = placeAdapter.getInitialState({
  viewState: null
});

export function placesReducer(
  state = initialState,
  action: PlacesAction
): PlacesState {
  switch (action.type) {
    case PlacesActionTypes.GetPlaces: {
      return {
        ...state,
        viewState: ViewState.Loading
      };
    }

    case PlacesActionTypes.SavePlace: {
      return {
        ...state,
        viewState: ViewState.Saving
      };
    }

    case PlacesActionTypes.GetPlacesSuccess: {
      return placeAdapter.addAll((action as GetPlacesSuccessAction).payload, {
        ...state,
        viewState: null
      });
    }

    case PlacesActionTypes.SavePlaceSuccess: {
      return placeAdapter.upsertOne((action as SavePlaceSuccessAction).payload, {
        ...state,
        viewState: null
      });
    }

    case PlacesActionTypes.GetPlacesError: {
      return placeAdapter.removeAll({
        ...state,
        viewState: null
      });
    }

    case PlacesActionTypes.SavePlaceError: {
      return {
        ...state,
        viewState: null
      };
    }

    case PlacesActionTypes.DeletePlace: {
      return {
        ...state,
        viewState: ViewState.Saving
      };
    }

    case PlacesActionTypes.DeletePlaceError: {
      return placeAdapter.removeAll({
        ...state,
        viewState: null
      });
    }

    case PlacesActionTypes.DeletePlaceSuccess: {
      return placeAdapter.removeOne((action as DeletePlaceSuccessAction).payload, {
        ...state,
        viewState: null
      });
    }
  }

  return state;
}
