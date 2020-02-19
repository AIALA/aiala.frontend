import { initialState, tasksReducer, TasksState, taskAdapter } from './tasks.reducer';
import { GetTasksAction, GetTasksSuccessAction, GetTasksErrorAction, SaveTaskSuccessAction, SaveTaskErrorAction } from './tasks.actions';
import { Task } from '../models/Task';
import { taskAdapterSelectors } from './tasks.selectors';
import { ViewState } from '@xpdo/core/xdk';

describe('TasksReducer', () => {
  describe('GetTasks', () => {
    it('should set loading', () => {
      const state: TasksState = {
        ...initialState,
        viewState: 'oldLoading' as any
      };

      const result = tasksReducer(state, new GetTasksAction());

      expect(result.viewState).toBe(ViewState.Loading);
    });
  });

  describe('Get Tasks', () => {
    it('should on success update the tasks and set not loading', () => {
      const state: TasksState = {
        ...taskAdapter.addAll([{
          id: 'oldId1',
          name: 'oldName1',
          picture: 'temp'
        } as any], initialState),
        viewState: 'oldLoading' as any
      };
      const tasks: any = [{
        id: 'id1',
        name: 'name1'
      }, {
        id: 'id2',
        name: 'name2'
      }, {
        id: 'id3',
        name: 'name3'
      }] as Partial<Task>[];

      const result = tasksReducer(state, new GetTasksSuccessAction(tasks));

      expect(result.viewState).toBe(null);
      expect(taskAdapterSelectors.selectAll(result)).toEqual(tasks);
    });

    it('should on error update the tasks and set not loading', () => {
      const state: TasksState = {
        ...taskAdapter.addAll([{
          id: 'oldId1',
          name: 'oldName1',
          picture: 'temp'
        } as any], initialState),
        viewState: 'oldLoading' as any
      };

      const result = tasksReducer(state, new GetTasksErrorAction(null));

      expect(result.viewState).toBe(null);
      expect(taskAdapterSelectors.selectAll(result).length).toBe(0);
    });
  });

  describe('Save Task', () => {
    it('should on success update task and set not loading', () => {
      const expectedTasks: any = [{
        id: 'oldId1',
        name: 'oldName1',
        picture: 'temp1' as any
      }, {
        id: 'id2',
        name: 'newName2',
        picture: 'temp2' as any
      }] as Partial<Task>[];

      const state: TasksState = {
        ...taskAdapter.addAll([
          expectedTasks[0],
          {
            ...expectedTasks[1],
            name: 'oldName2'
          }
        ], initialState),
        viewState: 'oldLoading' as any
      };
      const result = tasksReducer(state, new SaveTaskSuccessAction(expectedTasks[1] as any));

      expect(result.viewState).toBe(null);
      expect(taskAdapterSelectors.selectAll(result)).toEqual(expectedTasks);
    });

    it('should on error set not loading', () => {
      const state: TasksState = {
        ...taskAdapter.addAll([{
          id: 'oldId1',
          name: 'oldName1',
          picture: 'temp'
        } as any], initialState),
        viewState: 'oldLoading' as any
      };

      const result = tasksReducer(state, new SaveTaskErrorAction(null));

      expect(result.viewState).toBe(null);
      expect(taskAdapterSelectors.selectAll(result).length).toBe(1);
    });
  });
});
