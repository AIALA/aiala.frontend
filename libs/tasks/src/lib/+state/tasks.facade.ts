import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';
import { TasksPartialState } from './tasks.reducer';
import { Store, select } from '@ngrx/store';
import { GetTasksAction, SaveTaskAction, DeleteTaskAction } from './tasks.actions';
import { tasksQuery } from './tasks.selectors';
import { map, take } from 'rxjs/operators';

@Injectable()
export class TasksFacade {
  tasks$: Observable<Task[]> = this.store.pipe(select(tasksQuery.getTasks));
  loading$: Observable<boolean> = this.store.pipe(select(tasksQuery.getLoading));
  saving$: Observable<boolean> = this.store.pipe(select(tasksQuery.getSaving));
  generalError$: Observable<any> = this.store.pipe(select(tasksQuery.getGeneralError));

  constructor(
    private store: Store<TasksPartialState>
  ) { }

  loadTasks(): void {
    this.store.dispatch(new GetTasksAction());
  }

  saveTask(task: Task): void {
    this.store.dispatch(new SaveTaskAction(task));
  }

  deleteTask(id: string): void {
    this.store.dispatch(new DeleteTaskAction(id));
  }

  getTaskNames(taskIds: string[]): Observable<{ [id: string]: string }> {
    return this.tasks$.pipe(
      take(1),
      map(tasks => {
        const ret: any = {};
        taskIds.forEach(id => {
          const task = tasks.filter(t => t.id === id)[0];
          if (!task) {
            ret[id] = null;
          } else {
            ret[id]= task.name;
          }
        });
        return ret;
      })
    )
  }
}
