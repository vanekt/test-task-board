import { all } from 'redux-saga/effects';
import tasksSaga from './tasks';

export default function* rootSaga(extraArguments) {
  yield all([tasksSaga(extraArguments)]);
}
