import { combineReducers } from 'redux';

import common from './common';
import implementers from './implementers';
import tasks from './tasks';

export default combineReducers({
  common,
  implementers,
  tasks
});
