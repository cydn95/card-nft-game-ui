import { all, takeLatest, call, put, fork, select } from "redux-saga/effects";

import actions from "./actions";

import { getCardsAPI } from "../../services/axios/api";

// ******************************************************************************************
export function* getCards() {
  yield takeLatest(actions.GET_CARDS, function* () {
    const getCardsAsync = async () =>
      await getCardsAPI()
        .then((result) => result)
        .catch((error) => error);

    const res = yield call(getCardsAsync);

    if (res.status === 200) {
      yield put({
        type: actions.GET_CARDS_SUCCESS,
        cards: res.data.cards,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getCards)]);
}
