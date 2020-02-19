import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IViewState, ViewState } from '@xpdo/core/xdk';
import { ReportActivity } from '../models/ReportActivity';
import { ReportActivitiesAction, ReportActivitiesActionTypes, GetReportActivitiesSuccessAction } from './report-activities.actions';

export const REPORT_ACTIVITIES_FEATURE_KEY = 'reportactivities';

export interface ReportActivitiesState extends EntityState<ReportActivity>, IViewState {
}

export const reportActivitiesAdapter: EntityAdapter<ReportActivity> = createEntityAdapter<ReportActivity>();

export interface ReportActivitiesPartialState {
  readonly [REPORT_ACTIVITIES_FEATURE_KEY]: ReportActivitiesState;
}

export const initialState: ReportActivitiesState = reportActivitiesAdapter.getInitialState({
  viewState: null
});

export function reportActivitiesReducer(
  state = initialState,
  action: ReportActivitiesAction
): ReportActivitiesState {
  switch (action.type) {
    case ReportActivitiesActionTypes.GetReportActivities: {
      return {
        ...state,
        viewState: ViewState.Loading
      };
    }

    case ReportActivitiesActionTypes.GetReportActivitiesSuccess: {
      return reportActivitiesAdapter.addAll((action as GetReportActivitiesSuccessAction).payload, {
        ...state,
        viewState: null
      });
    }

    case ReportActivitiesActionTypes.GetReportActivitiesError: {
      return reportActivitiesAdapter.removeAll({
        ...state,
        viewState: null
      });
    }
  }

  return state;
}
