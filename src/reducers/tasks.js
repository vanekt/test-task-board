import { INIT_SUCCESS, MOVE_TASK } from '../constants/tasks';
import update from 'immutability-helper';

const initialState = {
  isInit: false,
  items: []
};

Object.freeze(initialState);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      return {
        ...state,
        isInit: true,
        items: action.payload
      };

    case MOVE_TASK:
      const dragCard = state.items[action.payload.dragIndex];
      return update(state, {
        items: {
          $splice: [[action.payload.dragIndex, 1], [action.payload.hoverIndex, 0, dragCard]]
        }
      });

    default:
      return state;
  }
}
