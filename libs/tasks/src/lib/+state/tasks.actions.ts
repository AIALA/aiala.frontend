import { Action } from '@ngrx/store';
import { Task } from '../models/Task';
import { HttpErrorResponse } from '@angular/common/http';

export enum TasksActionTypes {
  GetTasks = '[Tasks] Get Tasks',
  GetTasksSuccess = '[Tasks] Get Tasks Success',
  GetTasksError = '[Tasks] Get Tasks Error',

  SaveTask = '[Tasks] Save Task',
  SaveTaskSuccess = '[Tasks] Save Task Success',
  SaveTaskError = '[Tasks] Save Task Error',

  DeleteTask = '[Tasks] Delete Task',
  DeleteTaskSuccess = '[Tasks] Delete Task Success',
  DeleteTaskError = '[Tasks] Delete Task Error',
}

export class GetTasksAction implements Action {
  type = TasksActionTypes.GetTasks;
  constructor() {}
}

export class GetTasksSuccessAction implements Action {
  type = TasksActionTypes.GetTasksSuccess;
  constructor(public payload: Task[]) {}
}

export class GetTasksErrorAction implements Action {
  type = TasksActionTypes.GetTasksError;
  constructor(public payload: HttpErrorResponse) {}
}

export class SaveTaskAction implements Action {
  type = TasksActionTypes.SaveTask;
  constructor(public payload: Task) {}
}

export class SaveTaskSuccessAction implements Action {
  type = TasksActionTypes.SaveTaskSuccess;
  constructor(public payload: Task) {}
}

export class SaveTaskErrorAction implements Action {
  type = TasksActionTypes.SaveTaskError;
  constructor(public payload: HttpErrorResponse) {}
}

export class DeleteTaskAction implements Action {
  type = TasksActionTypes.DeleteTask;
  constructor(public payload: string) {}
}

export class DeleteTaskSuccessAction implements Action {
  type = TasksActionTypes.DeleteTaskSuccess;
  constructor(public payload: Task[]) {}
}

export class DeleteTaskErrorAction implements Action {
  type = TasksActionTypes.DeleteTaskError;
  constructor(public payload: HttpErrorResponse) {}
}

export type TasksAction =
  | GetTasksAction
  | GetTasksSuccessAction
  | GetTasksErrorAction
  | SaveTaskAction
  | SaveTaskSuccessAction
  | SaveTaskErrorAction
  | DeleteTaskAction
  | DeleteTaskSuccessAction
  | DeleteTaskErrorAction;
