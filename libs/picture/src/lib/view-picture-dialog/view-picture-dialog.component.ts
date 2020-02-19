import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ViewPictureDialogData } from '../models/ViewPictureDialogData';

@Component({
  selector: 'msft-aiala-view-picture-dialog',
  templateUrl: './view-picture-dialog.component.html',
  styleUrls: ['./view-picture-dialog.component.scss']
})
export class ViewPictureDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ViewPictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: ViewPictureDialogData
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
