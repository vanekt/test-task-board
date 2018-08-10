import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import configureStore from './store';
import sagas from './sagas';
import { initTasksRequest } from './actions/tasks';

const store = configureStore();
store.runSaga(sagas, {});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

store.dispatch(initTasksRequest());
