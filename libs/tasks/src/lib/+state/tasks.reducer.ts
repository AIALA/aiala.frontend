import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../models/Task';
import { TasksAction, TasksActionTypes, GetTasksSuccessAction, SaveTaskSuccessAction, DeleteTaskSuccessAction, DeleteTaskErrorAction, SaveTaskErrorAction, GetTasksErrorAction } from './tasks.actions';
import { IViewState, ViewState } from '@xpdo/core/xdk';

export const TASKS_FEATURE_KEY = 'tasks';

export interface TasksState extends EntityState<Task>, IViewState {
  error: any;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export interface TasksPartialState {
  readonly [TASKS_FEATURE_KEY]: TasksState;
}

export const initialState: TasksState = taskAdapter.getInitialState({
  viewState: null,
  error: null
});

export function tasksReducer(
  state = initialState,
  action: TasksAction
): TasksState {
  switch (action.type) {
    case TasksActionTypes.GetTasks: {
      return {
        ...state,
        viewState: ViewState.Loading,
        error: null
      };
    }

    case TasksActionTypes.DeleteTask:
    case TasksActionTypes.SaveTask: {
      return {
        ...state,
        viewState: ViewState.Saving,
        error: null
      };
    }

    case TasksActionTypes.DeleteTaskSuccess:
    case TasksActionTypes.GetTasksSuccess: {
      return taskAdapter.addAll((action as GetTasksSuccessAction | DeleteTaskSuccessAction).payload, {
        ...state,
        viewState: null,
        error: null
      });
    }

    case TasksActionTypes.GetTasksError: {
      return taskAdapter.removeAll({
        ...state,
        viewState: null,
        error: (action as GetTasksErrorAction).payload
      });
    }

    case TasksActionTypes.SaveTaskSuccess: {
      return taskAdapter.upsertOne((action as SaveTaskSuccessAction).payload, {
        ...state,
        viewState: null,
        error: null
      });
    }

    case TasksActionTypes.DeleteTaskError:
    case TasksActionTypes.SaveTaskError: {
      return {
        ...state,
        viewState: null,
        error: (action as DeleteTaskErrorAction | SaveTaskErrorAction).payload
      };
    }
  }

  return state;
}
