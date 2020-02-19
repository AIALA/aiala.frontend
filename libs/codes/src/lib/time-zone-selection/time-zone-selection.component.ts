import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TimeZonesFacade } from '../+state/time-zones.facade';
import { TimeZone } from '../models/TimeZone';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';

@Component({
  selector: 'msft-aiala-time-zone-selection',
  templateUrl: './time-zone-selection.component.html',
  styleUrls: ['./time-zone-selection.component.scss']
})
export class TimeZoneSelectionComponent implements OnInit {
  @Input() appFormGroup: FormGroup;
  @Input() appFormControlName: string;

  timeZones$ = this.facade.timeZones$;
  currentTimeZones$: Observable<TimeZone[]>;

  constructor(
    private facade: TimeZonesFacade
  ) { }

  ngOnInit() {
    this.facade.loadTimeZones();

    this.currentTimeZones$ = this.timeZones$.pipe(
      map(tzs => {
        const winterOffset = DateTime.local().set({ month: 1 }).offset;
        const summerOffset = DateTime.local().set({ month: 7 }).offset;
        return tzs.filter(tz => tz.offset.as('minutes') === winterOffset || tz.offset.as('minutes') === summerOffset);
      })
    );
  }
}
