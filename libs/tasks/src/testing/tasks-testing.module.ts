import { TasksApiService } from '../lib/services/tasks-api.service';
import { TasksFacade } from '../lib/+state/tasks.facade';
import { NgModule } from '@angular/core';
import { Task } from '../lib/models/Task';
import { Subject } from 'rxjs';
import { XpdoDynamicDialog } from '@xpdo/components';

export class TasksApiServiceMock implements Partial<TasksApiService> {
  getTasks: jasmine.Spy = jasmine.createSpy();
  saveTask: jasmine.Spy = jasmine.createSpy();
}

export class TasksFacadeMock implements Partial<TasksFacade> {
  tasks$: Subject<Task[]> = new Subject();
  loadTasks: jasmine.Spy = jasmine.createSpy();
  saveTask: jasmine.Spy = jasmine.createSpy();
  uploadPicture: jasmine.Spy = jasmine.createSpy();
}

export class XpdoDynamicDialogMock implements Partial<XpdoDynamicDialog> {
  open: jasmine.Spy = jasmine.createSpy();
}

@NgModule({
  providers: [{
    provide: TasksFacade,
    useClass: TasksFacadeMock
  }]
})
export class TasksTestingModule { }
