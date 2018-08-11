import { ADD_TASK, INIT_SUCCESS, MOVE_TASK } from '../constants/tasks';
import update from 'immutability-helper';

const newTask = {
  text: 'Some Text'
};

const initialState = {
  isInit: false,
  items: [],
  lastId: 0
};

Object.freeze(initialState);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      const lastId = action.payload
        .map(item => {
          return item.id;
        })
        .reduce((acc, value) => {
          return value > acc ? value : acc;
        });

      return {
        ...state,
        isInit: true,
        items: action.payload,
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
      const task = { ...newTask, id: nextId };
      return {
        ...state,
        items: [task].concat(state.items),
        lastId: nextId
      };

    default:
      return state;
  }
}
