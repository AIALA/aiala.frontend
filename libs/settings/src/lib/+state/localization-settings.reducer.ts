import { IViewState, ViewState } from '@xpdo/core/xdk';
import { LocalizationSettings } from '../models/LocalizationSettings';
import { LocalizationSettingsAction, LocalizationSettingsActionTypes, GetLocalizationSettingsSuccessAction } from './localization-settings.actions';

export const LOCALIZATION_SETTINGS_FEATURE_KEY = 'localizationSettings';

export interface LocalizationSettingsState extends IViewState {
  localizationSettings: LocalizationSettings;
}

export interface LocalizationSettingsPartialState {
  readonly [LOCALIZATION_SETTINGS_FEATURE_KEY]: LocalizationSettingsState;
}

export const initialState: LocalizationSettingsState = {
  viewState: null,
  localizationSettings: null
};

export function localizationSettingsReducer(
  state = initialState,
  action: LocalizationSettingsAction
): LocalizationSettingsState {
  switch (action.type) {
    case LocalizationSettingsActionTypes.GetLocalizationSettings: {
      return {
        ...state,
        viewState: ViewState.Loading
      };
    }

    case LocalizationSettingsActionTypes.GetLocalizationSettingsSuccess: {
      return {
        ...state,
        localizationSettings: (action as GetLocalizationSettingsSuccessAction).payload,
        viewState: null
      };
    }

    case LocalizationSettingsActionTypes.GetLocalizationSettingsError: {
      return {
        ...state,
        viewState: null
      };
    }
  }

  return state;
}
