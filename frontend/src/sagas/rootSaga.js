import { fork } from "redux-saga/effects";
import authFlow from "sagas/accounts/authSaga";
import signupFlow from "sagas/accounts/signupSaga";

export default function* (args) {
  yield fork(authFlow, args);
  yield fork(signupFlow, args);
}