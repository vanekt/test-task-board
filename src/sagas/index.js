import { all } from 'redux-saga/effects';
import commonSaga from './common';

export default function* rootSaga(extraArguments) {
  yield all([commonSaga(extraArguments)]);
}
