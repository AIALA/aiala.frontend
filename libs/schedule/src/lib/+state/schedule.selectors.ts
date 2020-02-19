import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SCHEDULE_FEATURE_KEY, scheduleAdapter, ScheduleState } from './schedule.reducer';
import { ViewStateSelector } from '@xpdo/core/xdk';

const getScheduleState = createFeatureSelector<ScheduleState>(
  SCHEDULE_FEATURE_KEY
);

export const scheduleAdapterSelectors = scheduleAdapter.getSelectors();

const getDays = createSelector(
  getScheduleState,
  (state: ScheduleState) => scheduleAdapterSelectors.selectAll(state)
);

const getLoadedRange = createSelector(
  getScheduleState,
  (state: ScheduleState) => state.loadedRange
);

const getLoading = createSelector(
  getScheduleState,
  ViewStateSelector.isLoading
);

const getSaving = createSelector(
  getScheduleState,
  ViewStateSelector.isSaving
);

const getError = createSelector(
  getScheduleState,
  (state: ScheduleState) => state.error && state.error.error
);

const getGeneralError = createSelector(
  getError,
  (state: any) => state && state['@general']
);

export const scheduleQuery = {
  getDays,
  getLoadedRange,
  getLoading,
  getError,
  getGeneralError,
  getSaving
};
