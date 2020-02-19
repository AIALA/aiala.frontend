import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialBarrel } from './material.barrel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { XpdoProgressModule, XpdoLayoutModule, XpdoIconModule } from '@xpdo/components';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { I18nUtilityService } from './services/i18n-utility.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { LanguageInterceptor } from './interceptors/language.interceptor';

const modules = [
  ...materialBarrel,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  XpdoProgressModule,
  XpdoLayoutModule,
  XpdoIconModule
];

@NgModule({
  imports: [
    CommonModule,
    modules
  ],
  providers: [
    CanDeactivateGuard,
    I18nUtilityService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true
    }
  ],
  exports: [
    modules,
    LoadingSpinnerComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    LoadingSpinnerComponent
  ],
  declarations: [
    ConfirmDialogComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {}
