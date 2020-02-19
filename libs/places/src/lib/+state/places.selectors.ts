import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewStateSelector } from '@xpdo/core/xdk';
import { PLACES_FEATURE_KEY, PlacesState, placeAdapter } from './places.reducer';

const getPlacesState = createFeatureSelector<PlacesState>(
  PLACES_FEATURE_KEY
);

export const placeAdapterSelectors = placeAdapter.getSelectors();

const getPlaces = createSelector(
  getPlacesState,
  (state: PlacesState) => placeAdapterSelectors.selectAll(state)
);

const getLoading = createSelector(
  getPlacesState,
  ViewStateSelector.isLoading
);

const getSaving = createSelector(
  getPlacesState,
  ViewStateSelector.isSaving
)

export const placesQuery = {
  getPlaces,
  getLoading,
  getSaving
};
