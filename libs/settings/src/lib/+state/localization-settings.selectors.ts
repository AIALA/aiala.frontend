import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewStateSelector } from '@xpdo/core/xdk';
import { LocalizationSettingsState, LOCALIZATION_SETTINGS_FEATURE_KEY } from './localization-settings.reducer';

const getLocalizationSettingsState = createFeatureSelector<LocalizationSettingsState>(
  LOCALIZATION_SETTINGS_FEATURE_KEY
);

const getLocalizationSettings = createSelector(
  getLocalizationSettingsState,
  (state: LocalizationSettingsState) => state.localizationSettings
);

const getLoading = createSelector(
  getLocalizationSettingsState,
  ViewStateSelector.isLoading
);

const getSaving = createSelector(
  getLocalizationSettingsState,
  ViewStateSelector.isSaving
)

export const localizationSettingsQuery = {
  getLocalizationSettings,
  getLoading,
  getSaving
};
