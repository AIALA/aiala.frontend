import { Injectable } from '@angular/core';
import { Task, TaskApiModel } from '../models/Task';
import { Observable } from 'rxjs';
import { ApiConfigService } from '@xpdo/core';
import { Required } from '@xpdo/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LuxonService } from '@xpdo/luxon';

@Injectable()
export class TasksApiService {
  private basePath = `${this.config.basePath}/v1`;

  constructor(
    private config: ApiConfigService,
    private http: HttpClient,
    private luxonService: LuxonService
  ) { }

  @Required('basePath')
  getTasks(): Observable<Task[]> {
    return this.http.get<TaskApiModel[]>(`${this.basePath}/tasks`).pipe(
      map(tasks => tasks.map(t => ({
        ...t,
        duration: this.luxonService.durationFromString(t.duration)
      })))
    );
  }

  @Required('basePath')
  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(
      `${this.basePath}/tasks`,
      {
        ...task,
        duration: task.duration.toFormat('hh:mm:ss')
      }
    );
  }

  @Required('basePath')
  deleteTask(id: string): Observable<Task[]> {
    return this.http.delete<Task[]>(`${this.basePath}/tasks/${id}`);
  }
}
