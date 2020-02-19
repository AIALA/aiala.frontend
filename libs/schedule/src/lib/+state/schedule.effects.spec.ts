import { TestBed } from '@angular/core/testing';
import { ScheduleEffects } from './schedule.effects';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { ScheduleApiServiceMock } from '../../testing/schedule-testing.module';
import { ScheduleApiService } from '../services/schedule-api.service';
import { hot } from 'jasmine-marbles';
import {
  GetDaysAction,
  GetDaysSuccessAction,
  UpsertDayAction,
  UpsertDaySuccessAction
} from './schedule.actions';
import { Store } from '@ngrx/store';
import { SCHEDULE_FEATURE_KEY, ScheduleState } from './schedule.reducer';
import { DateTime, Interval } from 'luxon';

describe('ScheduleEffects', () => {
  let actions: Observable<any>;
  let effects: ScheduleEffects;
  let apiServiceMock: ScheduleApiServiceMock;

  const state = {
    [SCHEDULE_FEATURE_KEY]: {
      loadedRange: 'range' as any
    } as ScheduleState
  };
  const store = of(state);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduleEffects,
        provideMockActions(() => actions),
        { provide: ScheduleApiService, useClass: ScheduleApiServiceMock },
        { provide: Store, useValue: store }
      ]
    });

    effects = TestBed.get(ScheduleEffects);
    apiServiceMock = TestBed.get(ScheduleApiService);
  });

  describe('getDays$', () => {
    it('should load days', () => {
      const days = 'days' as any;
      const startDate = DateTime.fromSeconds(123);
      const endDate = DateTime.fromSeconds(456);
      actions = hot('-a-|', {
        a: new GetDaysAction(Interval.fromDateTimes(startDate, endDate))
      });

      apiServiceMock.getDays.and.returnValue(of(days));

      expect(effects.getDays$).toBeObservable(
        hot('-a-|', {
          a: new GetDaysSuccessAction({
            days: days,
            start: startDate,
            end: endDate
          })
        })
      )
    });
  });

  describe('upsert day', () => {
    it('should on upsertDay$ upsert day', () => {
      const payload = 'payload' as any;
      actions = hot('-a-|', {
        a: new UpsertDayAction(payload)
      });

      apiServiceMock.upsertDay.and.returnValue(of(null));

      expect(effects.upsertDay$).toBeObservable(
        hot('-a-|', {
          a: new UpsertDaySuccessAction()
        })
      );
      expect(apiServiceMock.upsertDay).toHaveBeenCalledWith(payload);
    });

    it('should on upsertDaysSuccess$ load days', () => {
      actions = hot('-a-|', {
        a: new UpsertDaySuccessAction()
      });

      expect(effects.upsertDaySuccess$).toBeObservable(
        hot('-a-|', {
          a: new GetDaysAction(state[SCHEDULE_FEATURE_KEY].loadedRange)
        })
      );
    });
  });
});
