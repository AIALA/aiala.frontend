import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IViewState, ViewState } from '@xpdo/core/xdk';
import { TimeZone } from '../models/TimeZone';
import { TimeZonesAction, TimeZonesActionTypes, GetTimeZonesSuccessAction } from './time-zones.actions';

export const TIME_ZONES_FEATURE_KEY = 'timeZones';

export interface TimeZonesState extends EntityState<TimeZone>, IViewState {
}

export const timeZonesAdapter: EntityAdapter<TimeZone> = createEntityAdapter<TimeZone>();

export interface TimeZonesPartialState {
  readonly [TIME_ZONES_FEATURE_KEY]: TimeZonesState;
}

export const initialState: TimeZonesState = timeZonesAdapter.getInitialState({
  viewState: null
});

export function timeZonesReducer(
  state = initialState,
  action: TimeZonesAction
): TimeZonesState {
  switch (action.type) {
    case TimeZonesActionTypes.GetTimeZones: {
      return {
        ...state,
        viewState: ViewState.Loading
      };
    }

    case TimeZonesActionTypes.GetTimeZonesSuccess: {
      return timeZonesAdapter.addAll((action as GetTimeZonesSuccessAction).payload, {
        ...state,
        viewState: null
      });
    }

    case TimeZonesActionTypes.GetTimeZonesError: {
      return timeZonesAdapter.removeAll({
        ...state,
        viewState: null
      });
    }
  }

  return state;
}
