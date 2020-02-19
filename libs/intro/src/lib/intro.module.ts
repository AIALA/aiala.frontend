import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { XdkIntroModule } from '@xpdo/core/xdk';

import { IntroComponent } from './intro.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    XdkIntroModule.forRoot(),
    MatCardModule,
    MatProgressBarModule
  ],
  exports: [
    IntroComponent
  ],
  declarations: [IntroComponent]
})
export class IntroModule {
  static forRoot(redirectUrl?: string): ModuleWithProviders {
    return {
      ...XdkIntroModule.forRoot(redirectUrl),
      ngModule: IntroModule
    };
  }
}
