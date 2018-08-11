import { INIT_SUCCESS } from '../constants/common';

const initialState = {
  items: []
};

Object.freeze(initialState);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      const assignees = action.payload.assignees;
      return {
        ...state,
        items: assignees
      };

    default:
      return state;
  }
}
