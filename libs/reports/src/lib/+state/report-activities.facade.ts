import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportActivity } from '../models/ReportActivity';
import { select, Store } from '@ngrx/store';
import { GetReportActivitiesAction } from './report-activities.actions';
import { ReportActivitiesPartialState } from './report-activities.reducer';
import { reportActivitiesQuery } from './report-activities.selectors';

@Injectable()
export class ReportActivitiesFacade {
  activities$: Observable<ReportActivity[]> = this.store.pipe(select(reportActivitiesQuery.getReportActivities));
  loading$: Observable<boolean> = this.store.pipe(select(reportActivitiesQuery.getLoading));
  saving$: Observable<boolean> = this.store.pipe(select(reportActivitiesQuery.getSaving));

  constructor(
    private store: Store<ReportActivitiesPartialState>
  ) { }

  loadReportActivities(): void {
    this.store.dispatch(new GetReportActivitiesAction());
  }
}
