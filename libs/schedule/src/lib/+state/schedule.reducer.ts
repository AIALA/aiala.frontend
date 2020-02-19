import {
  GetDaysSuccessAction,
  ScheduleAction,
  ScheduleActionTypes,
  UpsertDayErrorAction
} from './schedule.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Day } from '../models/Day';
import { Interval } from 'luxon';
import { IViewState, ViewState } from '@xpdo/core/xdk';

export const SCHEDULE_FEATURE_KEY = 'schedule';

export const scheduleAdapter: EntityAdapter<Day> = createEntityAdapter<Day>();

export interface SchedulePartialState {
  [SCHEDULE_FEATURE_KEY]: ScheduleState;
}

export interface ScheduleState extends EntityState<Day>, IViewState {
  loadedRange: Interval;
  error: any;
}

export const initialState: ScheduleState = scheduleAdapter.getInitialState({
  viewState: null,
  loadedRange: null,
  error: null
});

export function scheduleReducer(
  state = initialState,
  action: ScheduleAction
) {
  switch (action.type) {
    case ScheduleActionTypes.UpsertDay: {
      return {
        ...state,
        viewState: ViewState.Saving,
        error: null
      };
    }

    case ScheduleActionTypes.GetDays: {
      return {
        ...state,
        viewState: ViewState.Loading,
        error: null
      };
    }

    case ScheduleActionTypes.UpsertDayError: {
      return {
        ...state,
        viewState: null,
        error: (action as UpsertDayErrorAction).error
      };
    }

    case ScheduleActionTypes.UpsertDaySuccess: {
      return {
        ...state,
        viewState: null
      };
    }

    case ScheduleActionTypes.GetDaysSuccess: {
      const successAction = action as GetDaysSuccessAction;
      return scheduleAdapter.addAll(successAction.payload.days, {
        ...state,
        viewState: null,
        loadedRange: Interval.fromDateTimes(successAction.payload.start, successAction.payload.end)
      });
    }

    case ScheduleActionTypes.GetDaysError: {
      return scheduleAdapter.removeAll({
        ...state,
        viewState: null,
        loadedRange: null
      })
    }
  }

  return state;
}
