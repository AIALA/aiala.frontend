import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DAY_TEMPLATES_FEATURE_KEY, dayTemplatesAdapter, DayTemplatesState } from './day-templates.reducer';
import { ViewStateSelector } from '@xpdo/core/xdk';

const getDayTemplatesState = createFeatureSelector<DayTemplatesState>(
  DAY_TEMPLATES_FEATURE_KEY
);

export const dayTemplatesAdapterSelectors = dayTemplatesAdapter.getSelectors();

const getDayTemplates = createSelector(
  getDayTemplatesState,
  (state: DayTemplatesState) => dayTemplatesAdapterSelectors.selectAll(state)
);

const getLoading = createSelector(
  getDayTemplatesState,
  ViewStateSelector.isLoading
);

const getSaving = createSelector(
  getDayTemplatesState,
  ViewStateSelector.isSaving
);

const getError = createSelector(
  getDayTemplatesState,
  (state: DayTemplatesState) => state.error && state.error.error
);

const getGeneralError = createSelector(
  getError,
  (state: any) => state && state['@general']
);

export const dayTemplatesQuery = {
  getDayTemplates,
  getLoading,
  getError,
  getGeneralError,
  getSaving
};
