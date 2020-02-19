import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { ReportApiService } from '../services/report-api.service';
import { GetReportActivitiesAction, ReportActivitiesActionTypes, GetReportActivitiesSuccessAction, GetReportActivitiesErrorAction } from './report-activities.actions';

@Injectable()
export class ReportActivitiesEffects {
  @Effect()
  getReportActivities$ = this.actions$.pipe(
    ofType<GetReportActivitiesAction>(ReportActivitiesActionTypes.GetReportActivities),
    exhaustMap(() =>
      this.api.getReportActivities().pipe(
        map(gallery => new GetReportActivitiesSuccessAction(gallery)),
        catchError(error => of(new GetReportActivitiesErrorAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private api: ReportApiService
  ) {}
}
