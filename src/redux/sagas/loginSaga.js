import { call, put, takeLatest } from 'redux-saga/effects'
import API from '../../API';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login(action) {
   try {
      const res = yield call([API,"login"], action.payload.credentials);
      yield put({type: 'LOGIN_SUCCESS', user: res});
   } catch (e) {
      yield put({type: 'LOGIN_FAILURE', message: e.message});
   }
}

function* loginSaga() {
  yield takeLatest('LOGIN_REQUESTED', login);
}

export default loginSaga;

