import { ADD_TASK, MOVE_TASK, TOGGLE_EDIT } from '../constants/tasks';

export const moveTask = payload => ({
  type: MOVE_TASK,
  payload
});

export const addTask = () => ({
  type: ADD_TASK
});

export const toggleEdit = payload => ({
  type: TOGGLE_EDIT,
  payload
});
