import { Component, OnInit } from '@angular/core';
import { ScheduleFacade } from '../+state/schedule.facade';
import { Day } from '@msft-aiala/schedule';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Interval, DateTime } from 'luxon';
import { Router } from '@angular/router';
import { XpdoDynamicDialog } from '@xpdo/components';
import { DocumentRequestDialogComponent, DocumentRequestDialogData } from '@msft-aiala/documents';

@Component({
  selector: 'msft-aiala-schedule-overview',
  templateUrl: './schedule-overview.component.html',
  styleUrls: ['./schedule-overview.component.scss']
})
export class ScheduleOverviewComponent implements OnInit {
  days$ = this.facade.days$;
  weeks$: Observable<Day[][]>;
  loading$ = this.facade.loading$;

  isPrintMode = false;

  readonly shortDateToday = DateTime.utc().startOf('day').toISODate();

  constructor(
    private facade: ScheduleFacade,
    private router: Router,
    private dialog: XpdoDynamicDialog
  ) { }

  private mapWeeks(days: Day[]): Day[][] {
    if (days.length % 7 !== 0) {
      return [];
    }

    const ret: Day[][] = [];
    for(let i = 0; i < days.length; i += 7) {
      ret.push(days.slice(i, i + 7));
    }
    return ret;
  }

  ngOnInit() {
    this.facade.loadDaysToday();
    this.weeks$ = this.days$.pipe(
      map(this.mapWeeks)
    );
  }

  navigateWeeks(amount: number): void {
    this.isPrintMode = false;

    this.facade.loadedRange$.pipe(
      take(1)
    ).subscribe(range => {
      this.facade.loadDays(
        Interval.fromDateTimes(
          range.start.plus({ weeks: amount }),
          range.end.plus({ weeks: amount })
        )
      )
    });
  }

  togglePrintMode(): void {
    this.isPrintMode = !this.isPrintMode;
  }

  onDayClick(day: Day): void {
    if (this.isPrintMode) {
      if (day.isTemporaryEntity) {
        return;
      }

      this.dialog.open(
        DocumentRequestDialogComponent,
        {
          data: {
            otpRoute: 'day/' + day.date.toISO(),
            documentRoute: 'day'
          } as DocumentRequestDialogData
        });

      this.isPrintMode = false;
    } else {
      this.router.navigate(['/schedule/day/' + day.shortDateString]);
    }
  }
}
