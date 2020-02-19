import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { ReportActivitiesFacade } from '../+state/report-activities.facade';
import { filter, debounceTime, take } from 'rxjs/operators';
import { Subscription, Observable, combineLatest, Subject, ReplaySubject, merge } from 'rxjs';
import { ReportConfig } from '../models/ReportConfig';
declare var $: any;

@Component({
  selector: 'msft-aiala-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  loading$ = this.facade.loading$;
  resize$: Subject<unknown> = new ReplaySubject<unknown>(1);
  activitiesSub: Subscription;

  availableWidth: number;
  availableHeight: number;
  editMode = false;
  configText: string;

  applyConfig$: Subject<ReportConfig> = new Subject();
  @Input() config$: Observable<ReportConfig>;

  constructor(
    private facade: ReportActivitiesFacade,
    private hostRef: ElementRef<HTMLDivElement>
  ) { }

  ngOnInit() {
    this.resize$.next();
    this.activitiesSub = combineLatest([
      this.facade.activities$,
      merge(this.config$, this.applyConfig$),
      this.resize$.pipe(debounceTime(200))
    ]).pipe(
      filter(([a, _]) => !!a)
    ).subscribe(([activities, config]) => {
      this.loading$.pipe(take(1)).subscribe(loading => {
        if (loading) {
          return;
        }

        this.editMode = config.pivotConfig.showUI;
        let onRefresh: any = () => {};
        if (this.editMode) {
          onRefresh = this.onRefresh.bind(this)
        }
        this.setAvailableSpace();
        $('#table').pivotUI(activities, {
          ...config.pivotConfig,
          renderers: $.extend(
            $.pivotUtilities.renderers,
            $.pivotUtilities.plotly_renderers,
            $.pivotUtilities.d3_renderers
          ),
          rendererOptions: {
            plotly: {
              width: this.availableWidth - 20,
              height: this.availableHeight - 20
            }
          },
          onRefresh: onRefresh
        }, true);
      });
    });
  }

  @HostListener('window:resize') onResize(): void {
    if (!this.editMode) {
      this.resize$.next();
    }
  }

  applyConfig(): void {
    try {
      this.applyConfig$.next({
        pivotConfig: {
          ...JSON.parse(this.configText),
          showUI: true
        },
        showUnitSelector: false
      });
    } catch (e) {
      alert('Please make sure the config is valid.');
    }
  }

  private setAvailableSpace(): void {
    if (this.editMode) {
      this.availableHeight = 500;
      this.availableWidth = 750;
      return;
    }

    this.availableHeight = this.hostRef.nativeElement.clientHeight;
    this.availableWidth = this.hostRef.nativeElement.offsetWidth;
  }

  private onRefresh(config: any): void {
    const configCopy = JSON.parse(JSON.stringify(config));
    //delete some values which are functions
    delete configCopy['aggregators'];
    delete configCopy['renderers'];
    //delete some bulky default values
    delete configCopy['rendererOptions'];
    delete configCopy['localeStrings'];
    delete configCopy['showUi'];
    delete configCopy['menuLimit'];
    delete configCopy['hiddenFromDragDrop'];
    delete configCopy['hiddenFromDragAggregators'];
    delete configCopy['unusedAttrsVertical'];
    delete configCopy['autoSortUnusedAttrs'];

    this.configText = JSON.stringify(configCopy, undefined, 2);
  }
}
