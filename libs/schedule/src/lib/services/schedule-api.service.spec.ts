import { TestBed } from '@angular/core/testing';
import { ScheduleApiService } from './schedule-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiConfigService } from '@xpdo/core';
import { ApiConfigServiceMock, ApiTestingModule } from '@xpdo/core/testing';
import { Day, DayApiModel, ScheduledTask, ScheduledTaskApiModel } from '@msft-aiala/schedule';
import { DateTime, Duration } from 'luxon';
import { LuxonServiceMock, LuxonTestingModule } from '@xpdo/luxon/testing';
import { LuxonService } from '@xpdo/luxon';
import { UpsertedDay, UpsertedDayApiModel } from '../models/UpsertedDay';
import { DayTemplate, DayTemplateApiModel } from '../models/DayTemplate';

describe('ScheduleApiService', () => {
  let testee: ScheduleApiService;
  let httpMock: HttpTestingController;
  let apiConfigServiceMock: ApiConfigServiceMock;
  let luxonServiceMock: LuxonServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ApiTestingModule,
        LuxonTestingModule
      ],
      providers: [
        ScheduleApiService
      ]
    });

    testee = TestBed.get(ScheduleApiService);
    httpMock = TestBed.get(HttpTestingController);
    apiConfigServiceMock = TestBed.get(ApiConfigService);
    luxonServiceMock = TestBed.get(LuxonService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getDays', () => {
    it('should query days with YYYY-MM-DD date format', () => {
      const durationFromString = 'durationFromString' as any;

      const apiReturnValue: DayApiModel[] = [{
        id: 'id1',
        isTemporaryEntity: false,
        tasks: [{
          id: 'id3',
          start: '08:00:00',
          end: '09:30:00',
          name: 'name',
          defaultDuration: '00:10:00',
          location: 'location',
          pictureUrl: 'pictureUrl',
          steps: ['step' as any]
        } as Partial<ScheduledTaskApiModel> as any],
        date: '2019-01-01T00:00:00.000Z',
        name: 'name'
      }, {
        id: 'id2',
        isTemporaryEntity: false,
        tasks: [],
        date: '2019-01-02T00:00:00.000Z',
        name: 'name'
      }];
      const expectedReturnValue: Day[] = [{
        tasks: [{
          ...apiReturnValue[0].tasks[0],
          start: durationFromString,
          end: durationFromString,
          defaultDuration: durationFromString
        } as Partial<ScheduledTask> as any],
        id: 'id1',
        isTemporaryEntity: false,
        date: DateTime.fromISO(apiReturnValue[0].date, { zone: 'utc' }),
        name: 'name',
        shortDateString: '2019-01-01'
      }, {
        tasks: [],
        id: 'id2',
        isTemporaryEntity: false,
        date: DateTime.fromISO(apiReturnValue[1].date, { zone: 'utc' }),
        name: 'name',
        shortDateString: '2019-01-02'
      }];

      const startDate = DateTime.fromISO('2019-01-01', { zone: 'utc' });
      const endDate = DateTime.fromISO('2019-01-02', { zone: 'utc' });
      luxonServiceMock.durationFromString.and.returnValue(durationFromString);

      testee.getDays(startDate, endDate).subscribe(r => {
        expect(r).toEqual(expectedReturnValue);
      });

      const req = httpMock.expectOne(request => {
        return request.url === apiConfigServiceMock.basePath + '/v1/' + 'schedule';
      });
      expect(req.request.params.get('from')).toEqual(apiReturnValue[0].date);
      expect(req.request.params.get('to')).toEqual(apiReturnValue[1].date);
      expect(req.request.method).toEqual('GET');
      req.flush(apiReturnValue);
    });
  });

  describe('upsertDay', () => {
    it('should upsert day', () => {
      const response = 'response' as any;
      const date = DateTime.fromISO('2019-01-04');
      const start = Duration.fromObject({ hour: 6, minute: 20 });
      const end = Duration.fromObject({ hour: 7, minute: 30 });

      const day = {
        id: 'id1',
        date: date,
        name: 'name',
        tasks: [{
          id: '1234',
          start: start,
          end: end,
          taskId: '5678'
        }],
        shortDateString: null
      } as UpsertedDay;
      const expectedUpsertModel = {
        id: 'id1',
        date: date.toISO(),
        name: 'name',
        tasks: [{
          ...day.tasks[0],
          start: start.toFormat('hh:mm:ss'),
          end: end.toFormat('hh:mm:ss')
        }]
      } as UpsertedDayApiModel;

      testee.upsertDay(day).subscribe(r => {
        expect(r).toBe(response);
      });

      const req = httpMock.expectOne(apiConfigServiceMock.basePath + '/v1/' + 'schedule');
      expect(req.request.body).toEqual(expectedUpsertModel);
      expect(req.request.method).toEqual('POST');
      req.flush(response);
    });
  });

  describe('createDayTemplate', () => {
    it('should create day template', () => {
      const response = 'response' as any;

      const template = {
        id: 'id',
        name: 'name',
        tasks: [{
          id: 'task',
          taskId: 'taskId',
          start: Duration.fromMillis(1235),
          end: Duration.fromMillis(578)
        }]
      } as DayTemplate;
      const expectedApiModel = {
        ...template,
        tasks: [{
          ...template.tasks[0],
          start: template.tasks[0].start.toFormat('hh:mm:ss'),
          end: template.tasks[0].end.toFormat('hh:mm:ss')
        }]
      } as DayTemplateApiModel;

      testee.createDayTemplate(template).subscribe(r => {
        expect(r).toBe(response);
      });

      const req = httpMock.expectOne(apiConfigServiceMock.basePath + '/v1/' + 'templates');
      expect(req.request.body).toEqual(expectedApiModel);
      expect(req.request.method).toEqual('POST');
      req.flush(response);
    });
  });

  describe('getDayTemplates', () => {
    it('should get day templates', () => {
      const durationReturnValues = [
        'd1',
        'd2'
      ] as any[];
      const response = [{
        id: 'id',
        name: 'name',
        tasks: [{
          id: 'taskId',
          taskId: 'also taskId',
          start: '09:00:00',
          end: '10:30:00'
        }]
      }] as DayTemplateApiModel[];
      const expectedModel = [{
        id: 'id',
        name: 'name',
        tasks: [{
          id: 'taskId',
          taskId: 'also taskId',
          start: durationReturnValues[0],
          end: durationReturnValues[1]
        }]
      }] as DayTemplate[];

      luxonServiceMock.durationFromString.and.returnValues(...durationReturnValues);

      testee.getDayTemplates().subscribe(r => {
        expect(r).toEqual(expectedModel);
      });

      const req = httpMock.expectOne(apiConfigServiceMock.basePath + '/v1/' + 'templates');
      expect(req.request.method).toEqual('GET');
      req.flush(response);
    });
  });

  describe('deleteDayTemplate', () => {
    it('should delete day template', () => {
      const response = 'response' as any;
      const id = 'id';

      testee.deleteDayTemplate(id).subscribe(r => {
        expect(r).toEqual(response);
      });

      const req = httpMock.expectOne(apiConfigServiceMock.basePath + '/v1/' + 'templates/' + id);
      expect(req.request.method).toEqual('DELETE');
      req.flush(response);
    });
  });
});
