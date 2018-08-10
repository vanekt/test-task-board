import { put, takeLatest } from 'redux-saga/effects';
import { INIT_REQUEST, INIT_SUCCESS, INIT_FAILURE } from '../constants/tasks';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* initTasks() {
  try {
    yield delay(3000);
    yield put({ type: INIT_SUCCESS });
  } catch (e) {
    yield put({ type: INIT_FAILURE });
  }
}

function* tasksSaga(ea) {
  yield takeLatest(INIT_REQUEST, initTasks, ea);
}

export default tasksSaga;
