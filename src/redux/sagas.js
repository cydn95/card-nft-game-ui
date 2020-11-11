import { all } from "redux-saga/effects";

import pageSagas from "./page/saga";
import cardsSagas from "./cards/saga";

export default function* rootSaga(getState) {
  yield all([pageSagas(), cardsSagas()]);
}
