import { Component, OnInit } from '@angular/core';
import { ReportActivitiesFacade } from '../+state/report-activities.facade';
import { Subject, ReplaySubject } from 'rxjs';
import { ReportConfig, DefaultReportConfigs } from '../models/ReportConfig';
import { BreakpointsService } from '@xpdo/components';
import { ReportUnit } from '../models/ReportUnit';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'msft-aiala-reports-overview',
  templateUrl: './reports-overview.component.html',
  styleUrls: ['./reports-overview.component.scss']
})
export class ReportsOverviewComponent implements OnInit {
  loading$ = this.facade.loading$;
  public isMobile$ = this.breakpointService.isMobile$;
  config$: Subject<ReportConfig> = new ReplaySubject<ReportConfig>(1);
  selectedIndex = 0;
  configs: ReportConfig[] = DefaultReportConfigs;

  units = ReportUnit;
  unitForm: FormGroup;

  constructor(
    private breakpointService: BreakpointsService,
    private facade: ReportActivitiesFacade,
    private formBuilder: FormBuilder
  ) {
    this.unitForm = this.formBuilder.group({
      unit: [ReportUnit.TaskName]
    });
    this.unitForm.controls['unit'].valueChanges.subscribe(unit => {
      this.config$.pipe(take(1)).subscribe(config => {
        if (config.showUnitSelector) {
          this.config$.next(this.applyUnit(config, unit))
        }
      })
    });
  }

  ngOnInit() {
    this.facade.loadReportActivities();
    this.select(0);
  }

  select(index: number): void {
    this.selectedIndex = index;
    let config = this.configs[index];
    if (config.showUnitSelector) {
      config = this.applyUnit(config, this.unitForm.value.unit);
    }
    this.config$.next(config);
  }

  private applyUnit(config: ReportConfig, unit: ReportUnit): ReportConfig {
    const clone = JSON.parse(JSON.stringify(config)) as ReportConfig;
    clone.pivotConfig.cols = [
      unit
    ];
    clone.pivotConfig.exclusions = {
      ...clone.pivotConfig.exclusions,
      [unit]: [
        'null'
      ]
    };
    return clone;
  }
}
