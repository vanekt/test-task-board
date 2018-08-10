import { put, takeLatest } from 'redux-saga/effects';
import { INIT_REQUEST, INIT_SUCCESS, INIT_FAILURE } from '../constants/tasks';
import { tasks } from '../sources/tasks';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* initTasks() {
  try {
    yield delay(1000);
    yield put({ type: INIT_SUCCESS, payload: tasks });
  } catch (e) {
    yield put({ type: INIT_FAILURE });
  }
}

function* tasksSaga(ea) {
  yield takeLatest(INIT_REQUEST, initTasks, ea);
}

export default tasksSaga;
