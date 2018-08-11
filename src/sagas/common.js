import { put, takeLatest } from 'redux-saga/effects';
import { INIT_REQUEST, INIT_SUCCESS, INIT_FAILURE } from '../constants/common';
import { tasks } from '../sources/tasks';
import { assignees } from '../sources/assignees';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* initApp() {
  try {
    yield delay(1000);
    yield put({ type: INIT_SUCCESS, payload: { tasks, assignees } });
  } catch (e) {
    yield put({ type: INIT_FAILURE });
  }
}

function* commonSaga(ea) {
  yield takeLatest(INIT_REQUEST, initApp, ea);
}

export default commonSaga;
