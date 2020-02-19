import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@msft-aiala/shared';
import { XdkSettingsModule, XdkIntroModule } from '@xpdo/core/xdk';
import { LocalizationSettingsFacade } from './+state/localization-settings.facade';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocalizationSettingsEffects } from './+state/localization-settings.effects';
import { localizationSettingsReducer, LOCALIZATION_SETTINGS_FEATURE_KEY } from './+state/localization-settings.reducer';
import { ApiModule } from '@xpdo/core';
import { SettingsApiService } from './services/settings-api.service';
import { LocalizationSettingsStep } from './intro/localization-settings-intro.step';
import { LanguageStep } from './intro/language-intro.step';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    XdkSettingsModule,
    EffectsModule.forFeature([LocalizationSettingsEffects]),
    StoreModule.forFeature(LOCALIZATION_SETTINGS_FEATURE_KEY, localizationSettingsReducer),
    ApiModule.forFeature(),
    XdkIntroModule.forFeature([LocalizationSettingsStep], { order: 1 }),
    XdkIntroModule.forFeature([LanguageStep], { order: 1 })
  ],
  providers: [
    LocalizationSettingsFacade,
    SettingsApiService
  ]
})
export class SettingsModule {}
