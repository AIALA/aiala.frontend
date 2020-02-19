import { Injectable } from '@angular/core';
import { Day } from '../models/Day';
import { Observable } from 'rxjs';
import { SchedulePartialState } from './schedule.reducer';
import { Store, select } from '@ngrx/store';
import { scheduleQuery } from './schedule.selectors';
import { GetDaysAction, UpsertDayAction } from './schedule.actions';
import { DateTime, Interval } from 'luxon';
import { UpsertedDay } from '../models/UpsertedDay';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ScheduleFacade {
  days$: Observable<Day[]> = this.store.pipe(select(scheduleQuery.getDays));
  loadedRange$: Observable<Interval> = this.store.pipe(select(scheduleQuery.getLoadedRange));
  loading$: Observable<boolean> = this.store.pipe(select(scheduleQuery.getLoading));
  saving$: Observable<boolean> = this.store.pipe(select(scheduleQuery.getSaving));
  error$: Observable<HttpErrorResponse> = this.store.pipe(select(scheduleQuery.getError));
  generalError$: Observable<any> = this.store.pipe(select(scheduleQuery.getGeneralError));

  constructor(
    private store: Store<SchedulePartialState>
  ) {}

  loadDays(interval: Interval): void {
    this.store.dispatch(new GetDaysAction(interval));
  }

  loadDaysToday(): void {
    const from = DateTime.utc().startOf('week').minus({ week: 1 });
    const to = from.plus({ week: 3, day: 6 });
    this.loadDays(Interval.fromDateTimes(from, to));
  }

  upsertDay(day: UpsertedDay): void {
    this.store.dispatch(new UpsertDayAction(day));
  }
}
