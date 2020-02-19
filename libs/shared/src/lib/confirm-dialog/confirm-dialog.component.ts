import { AfterViewInit, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmDialogData, ConfirmDialogType } from './ConfirmDialogData';

@Component({
  selector: 'msft-aiala-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements AfterViewInit {
  @ViewChild('unsavedTitle') unsavedTitle: TemplateRef<any>;
  @ViewChild('unsavedText') unsavedText: TemplateRef<any>;
  @ViewChild('unauthorizedTitle') unauthorizedTitle: TemplateRef<any>;
  @ViewChild('unauthorizedText') unauthorizedText: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: ConfirmDialogData
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Workaround for not being able to pass in a TemplateRef, because no template exists.
      // Examples: CanDeactivateGuard, UnauthorizedInterceptor
      if (this.dialogData.type === ConfirmDialogType.UnsavedChanges) {
        this.dialogData.text = this.unsavedText;
        this.dialogData.title = this.unsavedTitle;
      } else if (this.dialogData.type === ConfirmDialogType.Unauthorized) {
        this.dialogData.text = this.unauthorizedText;
        this.dialogData.title = this.unauthorizedTitle;
      }

      if (!this.dialogData.buttonColor) {
        this.dialogData.buttonColor = 'primary';
      }
    });
  }
}
