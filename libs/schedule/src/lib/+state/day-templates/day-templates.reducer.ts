import { DayTemplate } from '../../models/DayTemplate';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import {
  CreateDayTemplateErrorAction,
  DayTemplatesAction,
  DayTemplatesActionTypes, DeleteDayTemplateErrorAction,
  GetDayTemplatesErrorAction, GetDayTemplatesSuccessAction
} from './day-templates.actions';
import { IViewState, ViewState } from '@xpdo/core/xdk';

export const DAY_TEMPLATES_FEATURE_KEY = 'daytemplates';

export const dayTemplatesAdapter: EntityAdapter<DayTemplate> = createEntityAdapter<DayTemplate>();

export interface DayTemplatesPartialState {
  [DAY_TEMPLATES_FEATURE_KEY]: DayTemplatesState;
}

export interface DayTemplatesState extends EntityState<DayTemplate>, IViewState {
  error: HttpErrorResponse;
}

export const initialState: DayTemplatesState = dayTemplatesAdapter.getInitialState({
  viewState: null,
  error: null
});

export function dayTemplatesReducer(
  state = initialState,
  action: DayTemplatesAction
) {
  switch (action.type) {
    case DayTemplatesActionTypes.GetDayTemplates: {
      return {
        ...state,
        viewState: ViewState.Loading,
        error: null
      };
    }

    case DayTemplatesActionTypes.DeleteDayTemplate:
    case DayTemplatesActionTypes.CreateDayTemplate: {
      return {
        ...state,
        viewState: ViewState.Saving,
        error: null
      };
    }

    case DayTemplatesActionTypes.GetDayTemplatesSuccess: {
      return dayTemplatesAdapter.addAll((action as GetDayTemplatesSuccessAction).payload, {
        ...state,
        viewState: null
      });
    }

    case DayTemplatesActionTypes.DeleteDayTemplateSuccess:
    case DayTemplatesActionTypes.CreateDayTemplateSuccess: {
      return {
        ...state,
        viewState: null
      };
    }

    case DayTemplatesActionTypes.DeleteDayTemplateError:
    case DayTemplatesActionTypes.GetDayTemplatesError:
    case DayTemplatesActionTypes.CreateDayTemplateError: {
      return {
        ...state,
        viewState: null,
        error: (
          action as CreateDayTemplateErrorAction | GetDayTemplatesErrorAction | DeleteDayTemplateErrorAction
        ).error
      };
    }
  }

  return state;
}
