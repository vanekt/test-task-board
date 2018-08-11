import { INIT_SUCCESS } from '../constants/common';

const initialState = {
  items: []
};

Object.freeze(initialState);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      const implementers = action.payload.implementers;
      return {
        ...state,
        items: implementers
      };

    default:
      return state;
  }
}
