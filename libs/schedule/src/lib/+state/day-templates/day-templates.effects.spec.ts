import { Observable, of } from 'rxjs';
import { ScheduleApiServiceMock } from '../../../testing/schedule-testing.module';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ScheduleApiService } from '../../services/schedule-api.service';
import { hot } from 'jasmine-marbles';
import {
  CreateDayTemplateAction,
  CreateDayTemplateSuccessAction, DeleteDayTemplateAction, DeleteDayTemplateSuccessAction,
  GetDayTemplatesAction, GetDayTemplatesSuccessAction
} from './day-templates.actions';
import { DayTemplatesEffects } from './day-templates.effects';

describe('DayTemplatesEffects', () => {
  let actions: Observable<any>;
  let effects: DayTemplatesEffects;
  let apiServiceMock: ScheduleApiServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DayTemplatesEffects,
        provideMockActions(() => actions),
        { provide: ScheduleApiService, useClass: ScheduleApiServiceMock }
      ]
    });

    effects = TestBed.get(DayTemplatesEffects);
    apiServiceMock = TestBed.get(ScheduleApiService);
  });

  describe('create day template', () => {
    it('should on createDayTemplate$ call api', () => {
      const payload = 'payload' as any;
      actions = hot('-a-|', {
        a: new CreateDayTemplateAction(payload)
      });

      apiServiceMock.createDayTemplate.and.returnValue(of(null));

      expect(effects.createDayTemplate$).toBeObservable(
        hot('-a-|', {
          a: new CreateDayTemplateSuccessAction()
        })
      );
      expect(apiServiceMock.createDayTemplate).toHaveBeenCalledWith(payload);
    });

    it('should on createDayTemplateSuccess$ get templates', () => {
      actions = hot('-a-|', {
        a: new CreateDayTemplateSuccessAction()
      });

      expect(effects.createDayTemplateSuccess$).toBeObservable(
        hot('-a-|', {
          a: new GetDayTemplatesAction()
        })
      );
    });
  });

  describe('get day templates', () => {
    it('should on getDayTemplates$ call api', () => {
      const payload = 'payload' as any;
      actions = hot('-a-|', {
        a: new GetDayTemplatesAction()
      });

      apiServiceMock.getDayTemplates.and.returnValue(of(payload));

      expect(effects.getDayTemplates$).toBeObservable(
        hot('-a-|', {
          a: new GetDayTemplatesSuccessAction(payload)
        })
      );
    });
  });

  describe('delete day template', () => {
    it('should on deleteDayTemplate$ call api', () => {
      const id = 'id';
      actions = hot('-a-|', {
        a: new DeleteDayTemplateAction(id)
      });

      apiServiceMock.deleteDayTemplate.and.returnValue(of(null));

      expect(effects.deleteDayTemplate$).toBeObservable(
        hot('-a-|', {
          a: new DeleteDayTemplateSuccessAction()
        })
      );

      expect(apiServiceMock.deleteDayTemplate).toHaveBeenCalledWith(id);
    });
  });
});
