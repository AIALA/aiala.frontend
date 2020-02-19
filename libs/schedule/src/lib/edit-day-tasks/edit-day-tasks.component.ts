import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksFacade, Task } from '@msft-aiala/tasks';
import { FormGroup } from '@angular/forms';
import { ScheduleEditableConfig } from '../models/ScheduleEditableConfig';

@Component({
  selector: 'msft-aiala-edit-day-tasks',
  templateUrl: './edit-day-tasks.component.html',
  styleUrls: ['./edit-day-tasks.component.scss']
})
export class EditDayTasksComponent implements OnInit {
  @Input() editableConfig: ScheduleEditableConfig;
  @Input() form: FormGroup;
  @Output() addTask: EventEmitter<Task> = new EventEmitter();

  tasks$ = this.tasksFacade.tasks$;

  constructor(
    private tasksFacade: TasksFacade
  ) { }

  ngOnInit() {
    this.tasksFacade.loadTasks();
  }
}
