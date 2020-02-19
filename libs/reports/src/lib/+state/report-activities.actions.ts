import { Action } from '@ngrx/store';
import { ReportActivity } from '../models/ReportActivity';

export enum ReportActivitiesActionTypes {
  GetReportActivities = '[ReportActivities] Get ReportActivities',
  GetReportActivitiesSuccess = '[ReportActivities] Get ReportActivities Success',
  GetReportActivitiesError = '[ReportActivities] Get ReportActivities Error',
}

export class GetReportActivitiesAction implements Action {
  type = ReportActivitiesActionTypes.GetReportActivities;
  constructor() {}
}

export class GetReportActivitiesSuccessAction implements Action {
  type = ReportActivitiesActionTypes.GetReportActivitiesSuccess;
  constructor(public payload: ReportActivity[]) {}
}

export class GetReportActivitiesErrorAction implements Action {
  type = ReportActivitiesActionTypes.GetReportActivitiesError;
  constructor(public payload: any) {}
}

export type ReportActivitiesAction =
  | GetReportActivitiesAction
  | GetReportActivitiesSuccessAction
  | GetReportActivitiesErrorAction;
