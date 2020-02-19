import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './register.routing';
import { LanguageComponent } from './steps/language/language.component';
import { AccountDetailsComponent } from './steps/account-details/account-details.component';
import { SharedModule } from '@msft-aiala/shared';
import { StoreModule } from '@ngrx/store';
import { REGISTER_FEATURE_KEY, registerReducer, initialState } from './+state/register.reducer';
import { RegisterFacade } from './+state/register.facade';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffects } from './+state/register.effects';
import { RegisterApiService } from './services/register-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from '@xpdo/core';
import { ErrorModule } from '@msft-aiala/error';
import { CodesModule } from '@msft-aiala/codes';
import { CompleteComponent } from './steps/complete/complete.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule,
    HttpClientModule,
    ApiModule.forFeature(),
    StoreModule.forFeature(REGISTER_FEATURE_KEY, registerReducer, {
      initialState: initialState
    }),
    EffectsModule.forFeature([RegisterEffects]),
    ErrorModule,
    CodesModule
  ],
  declarations: [
    RegisterComponent,
    LanguageComponent,
    AccountDetailsComponent,
    CompleteComponent
  ],
  providers: [
    RegisterFacade,
    RegisterApiService
  ]
})
export class RegisterModule {}
