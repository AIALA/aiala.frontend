import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@msft-aiala/shared';
import { XpdoLayoutModule } from '@xpdo/components';
import { HmrStoreModule, hmrMetaReducer } from '@xpdo/core/hmr';
import { AppRoutingModule } from './app.routing';
import { ApiModule, API_BASE_PATH_LOADER_TOKEN, AppConfig, AppConfigModule } from '@xpdo/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { XdkInvitationModule, INVITATION_REDIRECT_URL_LOADER_TOKEN } from '@xpdo/core/xdk';
import { GoogleRecaptchaModule, RECAPTCHA_PUBLIC_KEY_LOADER_TOKEN } from '@xpdo/google/recaptcha';

export function apiConfigLoader(appConfig: AppConfig): Observable<string> {
  return appConfig.getConfig('api.basePath');
}

export function invitationRedirectUrlLoader(appConfig: AppConfig) {
  return appConfig.getConfig('invitation.redirectUrl');
}

export function recaptchaLoader(appConfig: AppConfig): Observable<string> {
  return appConfig.getConfig('recaptcha.publicKey');
}

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot({ }, { metaReducers: [hmrMetaReducer] }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    SharedModule,
    XpdoLayoutModule,
    AppRoutingModule,
    ApiModule.forRoot(),
    AppConfigModule.forRoot(environment.appConfig),
    XdkInvitationModule.forRoot(),
    GoogleRecaptchaModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: API_BASE_PATH_LOADER_TOKEN,
      useFactory: apiConfigLoader,
      deps: [AppConfig]
    },
    {
      provide: INVITATION_REDIRECT_URL_LOADER_TOKEN,
      useFactory: invitationRedirectUrlLoader, deps: [AppConfig]
    },
    {
      provide: RECAPTCHA_PUBLIC_KEY_LOADER_TOKEN,
      useFactory: recaptchaLoader,
      deps: [AppConfig]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule extends HmrStoreModule {}
