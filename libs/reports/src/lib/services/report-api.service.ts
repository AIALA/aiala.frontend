import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportActivity } from '../models/ReportActivity';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@xpdo/core';
import { Required } from '@xpdo/common';

@Injectable()
export class ReportApiService {
  private get basePath() {
    return `${this.config.basePath}/v1/reports`;
  }

  constructor(
    private config: ApiConfigService,
    private http: HttpClient
  ) {}

  @Required('basePath')
  getReportActivities(): Observable<ReportActivity[]> {
    return this.http.get<ReportActivity[]>(`${this.basePath}/activities`);
  }
}
