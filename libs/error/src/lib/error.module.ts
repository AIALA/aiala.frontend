import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './form-error/form-error.component';
import { SharedModule } from '@msft-aiala/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { XpdoErrorModule } from '@xpdo/common';
import { ErrorHandler } from './error.handler';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    XpdoErrorModule.forRoot(ErrorHandler)
  ],
  declarations: [
    FormErrorComponent
  ],
  exports: [
    FormErrorComponent
  ]
})
export class ErrorModule {}
