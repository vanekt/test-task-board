import { combineReducers } from 'redux';

import common from './common';
import assignees from './assignees';
import tasks from './tasks';

export default combineReducers({
  assignees,
  common,
  tasks
});
