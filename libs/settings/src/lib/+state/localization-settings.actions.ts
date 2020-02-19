import { Action } from '@ngrx/store';
import { LocalizationSettings } from '../models/LocalizationSettings';

export enum LocalizationSettingsActionTypes {
  GetLocalizationSettings = '[LocalizationSettings] Get LocalizationSettings',
  GetLocalizationSettingsSuccess = '[LocalizationSettings] Get LocalizationSettings Success',
  GetLocalizationSettingsError = '[LocalizationSettings] Get LocalizationSettings Error'
}

export class GetLocalizationSettingsAction implements Action {
  type = LocalizationSettingsActionTypes.GetLocalizationSettings;
  constructor() {}
}

export class GetLocalizationSettingsSuccessAction implements Action {
  type = LocalizationSettingsActionTypes.GetLocalizationSettingsSuccess;
  constructor(public payload: LocalizationSettings) {}
}

export class GetLocalizationSettingsErrorAction implements Action {
  type = LocalizationSettingsActionTypes.GetLocalizationSettingsError;
  constructor(public payload: any) {}
}

export type LocalizationSettingsAction =
  | GetLocalizationSettingsAction
  | GetLocalizationSettingsSuccessAction
  | GetLocalizationSettingsErrorAction;
