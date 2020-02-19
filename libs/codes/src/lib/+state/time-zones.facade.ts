import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TimeZone } from '../models/TimeZone';
import { GetTimeZonesAction } from './time-zones.actions';
import { timeZonesQuery } from './time-zones.selectors';
import { TimeZonesPartialState } from './time-zones.reducer';

@Injectable()
export class TimeZonesFacade {
  timeZones$: Observable<TimeZone[]> = this.store.pipe(select(timeZonesQuery.getTimeZones));
  loading$: Observable<boolean> = this.store.pipe(select(timeZonesQuery.getLoading));
  saving$: Observable<boolean> = this.store.pipe(select(timeZonesQuery.getSaving));

  constructor(
    private store: Store<TimeZonesPartialState>
  ) { }

  loadTimeZones(): void {
    this.store.dispatch(new GetTimeZonesAction());
  }
}
