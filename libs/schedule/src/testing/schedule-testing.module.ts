import { NgModule } from '@angular/core';
import { ScheduleApiService } from '../lib/services/schedule-api.service';

export class ScheduleApiServiceMock implements Partial<ScheduleApiService> {
  getDays: jasmine.Spy = jasmine.createSpy();
  upsertDay: jasmine.Spy = jasmine.createSpy();
  createDayTemplate: jasmine.Spy = jasmine.createSpy();
  getDayTemplates: jasmine.Spy = jasmine.createSpy();
  deleteDayTemplate: jasmine.Spy = jasmine.createSpy();
}

@NgModule({})
export class ScheduleTestingModule {}
