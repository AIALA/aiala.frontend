import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Day, DayApiModel } from '../models/Day';
import { ApiConfigService } from '@xpdo/core';
import { Required } from '@xpdo/common';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { LuxonService } from '@xpdo/luxon';
import { UpsertedDay, UpsertedDayApiModel } from '../models/UpsertedDay';
import { UpsertedDayTaskApiModel } from '../models/UpsertedDayTask';
import { DayTemplate, DayTemplateApiModel } from '../models/DayTemplate';

@Injectable()
export class ScheduleApiService {
  private basePath = `${this.config.basePath}/v1`;

  constructor(
    private http: HttpClient,
    private config: ApiConfigService,
    private luxonService: LuxonService
  ) {}

  @Required('basePath')
  getDays(startDate: DateTime, endDate: DateTime): Observable<Day[]> {
    return this.http.get<DayApiModel[]>(`${this.basePath}/schedule`, {
      params: {
        from: startDate.toISO(),
        to: endDate.toISO()
      }
    }).pipe(
      map(result => result.map(d => ({
        ...d,
        id: d.id,
        date: DateTime.fromISO(d.date, { zone: 'utc' }),
        tasks: d.tasks.map(t => ({
          ...t,
          start: this.luxonService.durationFromString(t.start),
          end: this.luxonService.durationFromString(t.end),
          defaultDuration: this.luxonService.durationFromString(t.defaultDuration)
        }))
      } as Day))),
      map(result => result.map(d => {
        d.shortDateString = d.date.toISODate();
        return d;
      }))
    );
  }

  @Required('basePath')
  upsertDay(day: UpsertedDay): Observable<any> {
    const params: {[param: string]: string} = {};
    if ((window as any).steamrollerMode) {
      params['steamrollerMode'] = 'true';
    }

    return this.http.post<any>(`${this.basePath}/schedule`, {
      id: day.id.startsWith('_') ? null : day.id,
      date: day.date.toISO(),
      name: day.name,
      tasks: day.tasks.map(t => ({
        ...t,
        start: t.start.toFormat('hh:mm:ss'),
        end: t.end.toFormat('hh:mm:ss')
      } as UpsertedDayTaskApiModel))
    } as UpsertedDayApiModel, {
      params: params
    });
  }

  @Required('basePath')
  createDayTemplate(template: DayTemplate): Observable<any> {
    return this.http.post<any>(`${this.basePath}/templates`, {
      ...template,
      tasks: template.tasks.map(t => ({
        ...t,
        start: t.start.toFormat('hh:mm:ss'),
        end: t.end.toFormat('hh:mm:ss')
      }))
    } as DayTemplateApiModel);
  }

  @Required('basePath')
  getDayTemplates(): Observable<DayTemplate[]> {
    return this.http.get<DayTemplateApiModel[]>(`${this.basePath}/templates`).pipe(
      map(templates => templates.map(template => ({
          ...template,
          tasks: template.tasks.map(task => ({
            ...task,
            start: this.luxonService.durationFromString(task.start),
            end: this.luxonService.durationFromString(task.end)
          }))
        }))
      )
    );
  }

  @Required('basePath')
  deleteDayTemplate(id: string): Observable<any> {
    return this.http.delete(`${this.basePath}/templates/${id}`);
  }
}
