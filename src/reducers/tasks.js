import update from 'immutability-helper';
import { INIT_SUCCESS } from '../constants/common';
import {
  ADD_TASK,
  DELETE_TASK,
  MOVE_TASK,
  TOGGLE_EDIT,
  CHANGE_TASK_NAME,
  CHANGE_TASK_TEXT,
  SAVE_TASK
} from '../constants/tasks';
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
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.taskId) {
            return { ...item, isEdit: action.payload.value };
          }
          return item;
        })
      };

    case DELETE_TASK:
      const taskIndex = state.items
        .map(item => {
          return item.id;
        })
        .indexOf(action.payload.taskId);

      let newItems = [...state.items];
      newItems.splice(taskIndex, 1);

      return {
        ...state,
        items: newItems
      };

    case CHANGE_TASK_NAME:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.taskId) {
            return {
              ...item,
              dirtyData: {
                name: action.payload.value
              }
            };
          }
          return item;
        })
      };

    case CHANGE_TASK_TEXT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.taskId) {
            return {
              ...item,
              dirtyData: {
                text: action.payload.value
              }
            };
          }
          return item;
        })
      };

    case SAVE_TASK:
      return (() => {
        const taskIndex = state.items
          .map(item => {
            return item.id;
          })
          .indexOf(action.payload.taskId);

        let newItems = [...state.items];
        newItems.splice(taskIndex, 1, {
          ...newItems[taskIndex],
          ...newItems[taskIndex].dirtyData,
          dirtyData: {},
          isEdit: false
        });

        return {
          ...state,
          items: newItems
        };
      })();

    default:
      return state;
  }
}
