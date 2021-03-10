import { take, call, put, fork, race, takeEvery } from 'redux-saga/effects';
import {
  SENDING_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
} from "utils/store_constants";
import { signup } from 'services/accounts/AccountsService';

function* register({ name, username, email, password }) {
  yield put({ type: SENDING_REQUEST, isSigningUp: true });
  try {
    let response = yield call(signup, name, username, email, password);

    return response;
  } catch (error) {
    let errorMessage = error.response.data.message;
    yield put({ type: SIGNUP_FAILURE, error: errorMessage });

    return false;
  } finally {
    yield put({ type: SENDING_REQUEST, isSigningUp: false });
  }
}

export function* signupFlow(history, action) {
  const success = yield call(register, action);
  if (success) {
    yield put({ type: SIGNUP_SUCCESS });
    history.push("/login");
  }
}

export default function* ({ history }) {
  yield takeEvery(SIGNUP_REQUEST, signupFlow, history);
}
