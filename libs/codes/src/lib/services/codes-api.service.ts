import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@xpdo/core';
import { Required } from '@xpdo/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeZone, TimeZoneModel } from '../models/TimeZone';
import { map } from 'rxjs/operators';
import { LuxonService } from '@xpdo/luxon';

@Injectable()
export class CodesApiService {
  private basePath = `${this.config.basePath}/v1/codes`;

  constructor(
    private config: ApiConfigService,
    private http: HttpClient,
    private luxonService: LuxonService
  ) {}

  @Required('basePath')
  getTimeZones(): Observable<TimeZone[]> {
    return this.http.get<TimeZoneModel[]>(`${this.basePath}/timezones`).pipe(
      map(timeZones => timeZones.map(tzm => ({
        ...tzm,
        offset: this.luxonService.durationFromString(tzm.offset)
      } as TimeZone)))
    );
  }
}
