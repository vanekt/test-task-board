import {
  ADD_TASK,
  DELETE_TASK,
  MOVE_TASK,
  TOGGLE_EDIT,
  CHANGE_TASK_NAME,
  CHANGE_TASK_TEXT,
  SAVE_TASK
} from '../constants/tasks';

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

export const deleteTask = payload => ({
  type: DELETE_TASK,
  payload
});

export const changeTaskName = payload => ({
  type: CHANGE_TASK_NAME,
  payload
});

export const saveTask = payload => ({
  type: SAVE_TASK,
  payload
});

export const changeTaskText = payload => ({
  type: CHANGE_TASK_TEXT,
  payload
});
