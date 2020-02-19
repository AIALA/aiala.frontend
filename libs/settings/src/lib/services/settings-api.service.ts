import { Injectable } from '@angular/core';
import { ApiConfigService } from '@xpdo/core';
import { HttpClient } from '@angular/common/http';
import { LuxonService } from '@xpdo/luxon';
import { Observable } from 'rxjs';
import { LocalizationSettings, LocalizationSettingsModel } from '../models/LocalizationSettings';
import { Required } from '@xpdo/common';
import { map } from 'rxjs/operators';

@Injectable()
export class SettingsApiService {
  private get basePath():string {
    return `${this.config.basePath}/v1/settings`;
  }

  constructor(
    private config: ApiConfigService,
    private http: HttpClient,
    private luxonService: LuxonService
  ) {}

  @Required('basePath')
  getLocalizationSettings(): Observable<LocalizationSettings> {
    return this.http.get<LocalizationSettingsModel>(`${this.basePath}/l10n`).pipe(
      map(ls => {
        let parseInput = ls.timeZoneOffset;
        let isNegative = false;
        if (ls.timeZoneOffset.startsWith('-')) {
          parseInput = ls.timeZoneOffset.replace('-', '');
          isNegative = true;
        }

        let offset = this.luxonService.durationFromString(parseInput);
        if (isNegative) {
          offset = offset.minus(offset.plus(offset));
        }

        return {
          ...ls,
          timeZoneOffset: offset
        } as LocalizationSettings;
      })
    );
  }
}
