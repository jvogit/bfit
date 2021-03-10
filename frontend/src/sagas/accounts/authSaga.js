import { take, takeEvery, call, put, fork, race } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  SENDING_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  TOKEN_VALIDATE,
} from "utils/store_constants";
import AuthService from 'services/AuthService';

function* login({ username, password }) {
  yield put({ type: SENDING_REQUEST, isAuthenticating: true });
  try {
    let response = yield call(AuthService.login, username, password);

    return response;
  } catch (error) {
    let errorMessage = error.response.data.message;
    yield put({ type: LOGIN_FAILURE, error: errorMessage });

    return false;
  } finally {
    yield put({ type: SENDING_REQUEST, isAuthenticating: false });
  }
}

export function* loginFlow(history, request) {
  let winner = yield race({
    auth: call(login, request),
    logout: take(LOGOUT_REQUEST)
  });

  if (winner.auth) {
    yield put({ type: LOGIN_SUCCESS, user: winner.auth.user });
    yield call(history.push, "/dashboard");
  }
}

export function* logoutFlow(history) {
  yield put({ type: SENDING_REQUEST, isAuthenticating: true });
  yield call(AuthService.logout);
  yield put({ type: LOGOUT_SUCCESS, user: null });
  yield call(history.push, "/");
  yield put({ type: SENDING_REQUEST, isAuthenticating: false });
}

export function* tokenValidate(history) {
  yield put({ type: SENDING_REQUEST, isAuthenticating: true });
  try {
    let user = yield call(AuthService.user);
    yield put({ type: LOGIN_SUCCESS, user });
  } catch (error) {
    if (error.response.status === 401) {
      yield put({ type: LOGOUT_REQUEST });
    }
  } finally {
    yield put({ type: SENDING_REQUEST, isAuthenticating: false });
  }
}

export default function* authFlow({ history }) {
  yield takeEvery(LOGIN_REQUEST, loginFlow, history);
  yield takeEvery(LOGOUT_REQUEST, logoutFlow, history);
  yield takeEvery(TOKEN_VALIDATE, tokenValidate, history);
}