import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DocumentsApiService } from '../services/documents-api.service';
import { DocumentRequestDialogData } from '../models/DocumentRequestDialogData';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'msft-aiala-document-request-dialog',
  templateUrl: './document-request-dialog.component.html',
  styleUrls: ['./document-request-dialog.component.scss']
})
export class DocumentRequestDialogComponent implements OnInit {
  url$: Observable<string>;

  constructor(
    private apiService: DocumentsApiService,
    @Inject(MAT_DIALOG_DATA) public dialogData: DocumentRequestDialogData,
    private dialogRef: MatDialogRef<DocumentRequestDialogComponent>
  ) { }

  ngOnInit() {
    this.url$ = this.apiService.getDocumentUrl(this.dialogData);
  }

  openDocument(): void {
    this.dialogRef.close();
    this.url$.pipe(
      take(1)
    ).subscribe(url => window.open(
      url,
      '_blank'
    ));
  }
}
