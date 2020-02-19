import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'msft-aiala-task-step-editor',
  templateUrl: './task-step-editor.component.html',
  styleUrls: ['./task-step-editor.component.scss']
})
export class TaskStepEditorComponent implements OnInit {
  @Input() stepFormGroup: FormGroup;

  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
