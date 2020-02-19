import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AZURE_API_KEY_LOADER_TOKEN } from '@msft-aiala/azure';
import { ErrorModule } from '@msft-aiala/error';
import { IntroModule } from '@msft-aiala/intro';
import { ReportsModule } from '@msft-aiala/reports';
import { SettingsModule } from '@msft-aiala/settings';
import { SharedModule } from '@msft-aiala/shared';
import { UserProfileModule } from '@msft-aiala/user-profile';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { XpdoIconModule, XpdoLayoutModule } from '@xpdo/components';
import {
  ApiModule,
  API_BASE_PATH_LOADER_TOKEN,
  AppConfig,
  AppConfigModule,
  clearAppStateMetaReducer
} from '@xpdo/core';
import { hmrMetaReducer, HmrStoreModule } from '@xpdo/core/hmr';
import {
  AUTH_CONFIG_LOADER_TOKEN,
  XdkAcceptInvitationModule,
  XdkAuthenticationModule,
  XdkCodesModule,
  XdkIdentityModule,
  XdkPoliciesModule
} from '@xpdo/core/xdk';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';

export function localeIdLoader() {
  return localStorage.getItem('aiala.uiCulture') || 'en-us';
}

export function authConfigLoader(appConfig: AppConfig) {
  return appConfig.getConfig('authSettings');
}

export function apiConfigLoader(appConfig: AppConfig): Observable<string> {
  return appConfig.getConfig('api.basePath');
}

export function azureApiKeyConfig(appConfig: AppConfig): Observable<string> {
  return appConfig.getConfig<string>('external.azureApiKey');
}

@NgModule({
  declarations: [AppComponent, MainComponent, HomeComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      { metaReducers: [hmrMetaReducer, clearAppStateMetaReducer] }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    SharedModule,
    XpdoLayoutModule,
    AppRoutingModule,
    XdkAuthenticationModule.forRoot(),
    XdkPoliciesModule,
    XdkIdentityModule,
    XdkCodesModule.forRoot(),
    IntroModule.forRoot(),
    ApiModule.forRoot(),
    AppConfigModule.forRoot(environment.appConfig),
    XdkAcceptInvitationModule,
    UserProfileModule.forRoot(['/profile', '/accept']),
    ErrorModule,
    XpdoIconModule,
    ReportsModule,
    SettingsModule
  ],
  providers: [
    { provide: LOCALE_ID, useFactory: localeIdLoader },
    {
      provide: AUTH_CONFIG_LOADER_TOKEN,
      useFactory: authConfigLoader,
      deps: [AppConfig]
    },
    {
      provide: API_BASE_PATH_LOADER_TOKEN,
      useFactory: apiConfigLoader,
      deps: [AppConfig]
    },
    {
      provide: AZURE_API_KEY_LOADER_TOKEN,
      useFactory: azureApiKeyConfig,
      deps: [AppConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule extends HmrStoreModule {}
