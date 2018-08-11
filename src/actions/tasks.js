import { ADD_TASK, MOVE_TASK } from '../constants/tasks';

export const moveTask = payload => ({
  type: MOVE_TASK,
  payload
});

export const addTask = () => ({
  type: ADD_TASK
});
