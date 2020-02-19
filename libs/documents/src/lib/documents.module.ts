import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentRequestDialogComponent } from './document-request-dialog/document-request-dialog.component';
import { DocumentsApiService } from './services/documents-api.service';
import { SharedModule } from '@msft-aiala/shared';
import { XpdoProgressModule } from '@xpdo/components';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    XpdoProgressModule
  ],
  declarations: [DocumentRequestDialogComponent],
  entryComponents: [
    DocumentRequestDialogComponent
  ],
  providers: [
    DocumentsApiService
  ]
})
export class DocumentsModule {}
