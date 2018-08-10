import { INIT_REQUEST, MOVE_TASK } from '../constants/tasks';

export const initTasksRequest = () => ({
  type: INIT_REQUEST
});

export const moveTask = payload => ({
  type: MOVE_TASK,
  payload
});
