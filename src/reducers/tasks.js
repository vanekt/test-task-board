import { INIT_SUCCESS } from '../constants/tasks';

const initialState = {
  isInit: false
};

Object.freeze(initialState);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      return {
        ...state,
        isInit: true
      };

    default:
      return state;
  }
}
