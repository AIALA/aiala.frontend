import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, TASKS_FEATURE_KEY, taskAdapter } from './tasks.reducer';
import { ViewStateSelector } from '@xpdo/core/xdk';

const getTasksState = createFeatureSelector<TasksState>(
  TASKS_FEATURE_KEY
);

export const taskAdapterSelectors = taskAdapter.getSelectors();

const getTasks = createSelector(
  getTasksState,
  (state: TasksState) => taskAdapterSelectors.selectAll(state)
);

const getLoading = createSelector(
  getTasksState,
  ViewStateSelector.isLoading
);

const getSaving = createSelector(
  getTasksState,
  ViewStateSelector.isSaving
);

const getError = createSelector(
  getTasksState,
  (state: TasksState) => state.error && state.error.error
);

const getGeneralError = createSelector(
  getError,
  (state: any) => state && state['@general']
);

export const tasksQuery = {
  getTasks,
  getLoading,
  getSaving,
  getGeneralError
};
