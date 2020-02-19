import { TasksApiService } from './tasks-api.service';
import { ApiConfigService } from '@xpdo/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiConfigServiceMock } from '@xpdo/core/testing';
import { Task, TaskApiModel } from '../models/Task';
import { Duration } from 'luxon';
import { LuxonServiceMock, LuxonTestingModule } from '@xpdo/luxon/testing';
import { LuxonService } from '@xpdo/luxon';

describe('TasksApiService', () => {
  let testee: TasksApiService;
  let httpMock: HttpTestingController;
  let apiConfigServiceMock: ApiConfigServiceMock;
  let luxonServiceMock: LuxonServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LuxonTestingModule
      ],
      providers: [
        TasksApiService,
        { provide: ApiConfigService, useClass: ApiConfigServiceMock }
      ]
    });

    testee = TestBed.get(TasksApiService);
    httpMock = TestBed.get(HttpTestingController);
    apiConfigServiceMock = TestBed.get(ApiConfigService);
    luxonServiceMock = TestBed.get(LuxonService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load tasks', () => {
    const durationFromString = 'durationFromString';
    const response = [{
      id: 'id',
      duration: '09:10'
    }] as Partial<TaskApiModel>[];
    const expectedResult = [{
      id: 'id',
      duration: durationFromString as any
    }] as Partial<Task>[] as any;

    luxonServiceMock.durationFromString.and.returnValue(durationFromString);

    testee.getTasks().subscribe(r => {
      expect(r).toEqual(expectedResult);
    });

    const req = httpMock.expectOne(apiConfigServiceMock.basePath + '/v1/' + 'tasks');
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should save new task', () => {
    const minute = 12;
    const hour = 23;
    const input = {
      name: 'name',
      duration: Duration.fromObject({ hour, minute })
    } as Partial<Task> as any;
    const request = {
      name: 'name',
      duration: `${hour}:${minute}:00`
    };
    const response = 'response' as any;

    testee.saveTask(input).subscribe(r => {
      expect(r).toBe(response);
    });

    const req = httpMock.expectOne(apiConfigServiceMock.basePath + '/v1/' + 'tasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(response);
  });
});
