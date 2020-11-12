import { all } from "redux-saga/effects";

import lpstakingSagas from "./lpstaking/saga";
import cardsSagas from "./cards/saga";

export default function* rootSaga(getState) {
  yield all([lpstakingSagas(), cardsSagas()]);
}
