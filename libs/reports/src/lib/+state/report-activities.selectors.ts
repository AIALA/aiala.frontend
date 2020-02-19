import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewStateSelector } from '@xpdo/core/xdk';
import { REPORT_ACTIVITIES_FEATURE_KEY, ReportActivitiesState, reportActivitiesAdapter } from './report-activities.reducer';

const getReportActivitiesState = createFeatureSelector<ReportActivitiesState>(
  REPORT_ACTIVITIES_FEATURE_KEY
);

export const reportActivitiesAdapterSelectors = reportActivitiesAdapter.getSelectors();

const getReportActivities = createSelector(
  getReportActivitiesState,
  (state: ReportActivitiesState) => reportActivitiesAdapterSelectors.selectAll(state)
);

const getLoading = createSelector(
  getReportActivitiesState,
  ViewStateSelector.isLoading
);

const getSaving = createSelector(
  getReportActivitiesState,
  ViewStateSelector.isSaving
)

export const reportActivitiesQuery = {
  getReportActivities,
  getLoading,
  getSaving
};
