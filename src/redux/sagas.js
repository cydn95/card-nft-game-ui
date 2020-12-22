import { all } from "redux-saga/effects";

import lpstakingSagas from "./lpstaking/saga";
import cardsSagas from "./cards/saga";
import oldNFTStakingSagas from "./oldNFTStaking/saga";

export default function* rootSaga(getState) {
  yield all([lpstakingSagas(), cardsSagas(), oldNFTStakingSagas()]);
}
