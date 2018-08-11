import update from 'immutability-helper';
import { INIT_SUCCESS } from '../constants/common';
import { ADD_TASK, MOVE_TASK, TOGGLE_EDIT } from '../constants/tasks';
import { task } from '../structures/task';

const initialState = {
  items: [],
  lastId: 0
};

Object.freeze(initialState);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      const tasks = action.payload.tasks;
      const lastId = tasks
        .map(item => {
          return item.id;
        })
        .reduce((acc, value) => {
          return value > acc ? value : acc;
        });

      return {
        ...state,
        items: tasks,
        lastId: lastId
      };

    case MOVE_TASK:
      const dragCard = state.items[action.payload.dragIndex];
      return update(state, {
        items: {
          $splice: [[action.payload.dragIndex, 1], [action.payload.hoverIndex, 0, dragCard]]
        }
      });

    case ADD_TASK:
      const nextId = state.lastId + 1;
      const newTask = { ...task, id: nextId, isEdit: true };
      return {
        ...state,
        items: [newTask].concat(state.items),
        lastId: nextId
      };

    case TOGGLE_EDIT:
      const taskId = action.payload.taskId;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === taskId) {
            return { ...item, isEdit: action.payload.value };
          }
          return item;
        })
      };

    default:
      return state;
  }
}
