import { scheduleAdapter, scheduleReducer, ScheduleState } from './schedule.reducer';
import { GetDaysErrorAction, GetDaysSuccessAction } from './schedule.actions';
import { Day } from '../models/Day';
import { scheduleAdapterSelectors } from './schedule.selectors';
import { DateTime } from 'luxon';

describe('scheduleReducer', () => {
  describe('getDays', () => {
    it('should on success set values', () => {
      let state: ScheduleState = scheduleAdapter.getInitialState({} as any);
      state = scheduleAdapter.addOne({
        id: 'test'
      } as any, state);
      const expectedDays: Day[] = [{
        id: 'id1',
        date: DateTime.fromMillis(1234),
        name: 'name1',
        tasks: ['tasks1' as any]
      } as any];

      const action = new GetDaysSuccessAction({
        days: [{
          ...expectedDays[0]
        }],
        start: DateTime.fromMillis(123),
        end: DateTime.fromMillis(456)
      });

      const result = scheduleReducer(state, action);

      expect(scheduleAdapterSelectors.selectAll(result)).toEqual(expectedDays);
      expect(result.viewState).toEqual(null);
    });

    it('should on error clear values', () => {
      let state: ScheduleState = scheduleAdapter.getInitialState({
        loadedDaysEnd: 'oldValue' as any,
        loadedDaysStart: 'oldValue' as any
      } as any);
      state = scheduleAdapter.addOne({
        id: 'oldId'
      } as any, state);

      const action = new GetDaysErrorAction(null);

      const result = scheduleReducer(state, action);

      expect(scheduleAdapterSelectors.selectAll(result)).toEqual([]);
      expect(result.viewState).toEqual(null);
      expect(result.loadedRange).toEqual(null);
    });
  });
});
