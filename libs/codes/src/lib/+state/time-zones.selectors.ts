import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewStateSelector } from '@xpdo/core/xdk';
import { TimeZonesState, TIME_ZONES_FEATURE_KEY, timeZonesAdapter } from './time-zones.reducer';

const getTimeZonesState = createFeatureSelector<TimeZonesState>(
  TIME_ZONES_FEATURE_KEY
);

export const timeZonesAdapterSelectors = timeZonesAdapter.getSelectors();

const getTimeZones = createSelector(
  getTimeZonesState,
  (state: TimeZonesState) => timeZonesAdapterSelectors.selectAll(state)
);

const getLoading = createSelector(
  getTimeZonesState,
  ViewStateSelector.isLoading
);

const getSaving = createSelector(
  getTimeZonesState,
  ViewStateSelector.isSaving
)

export const timeZonesQuery = {
  getTimeZones,
  getLoading,
  getSaving
};
