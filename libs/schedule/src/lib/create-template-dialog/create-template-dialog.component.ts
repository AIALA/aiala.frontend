import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DayTemplatesFacade } from '../+state/day-templates/day-templates.facade';
import { UpsertedDay } from '../models/UpsertedDay';

@Component({
  selector: 'msft-aiala-create-template-dialog',
  templateUrl: './create-template-dialog.component.html',
  styleUrls: ['./create-template-dialog.component.scss']
})
export class CreateTemplateDialogComponent implements OnInit {
  form: FormGroup;

  loading$ = this.facade.loading$;
  errors$ = this.facade.generalError$;

  constructor(
    private facade: DayTemplatesFacade,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: UpsertedDay
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  save(): void {
    this.facade.createDayTemplate({
      id: null,
      name: this.form.value.name,
      dayName: this.dialogData.name,
      tasks: this.dialogData.tasks.map(t => ({
        id: null,
        taskId: t.taskId,
        start: t.start,
        end: t.end
      }))
    });
    const subscription = this.facade.loading$.subscribe(loading => {
      if (!loading) {
        this.dialogRef.close();
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
