import {
  all,
  takeLatest,
  call,
  put,
  fork,
  takeEvery,
} from "redux-saga/effects";

import BigNumber from "bignumber.js";

import actions from "./actions";

import { RESPONSE } from "../../helper/constant";

import { getWeb3 } from "../../services/web3";
import {
  getBattleFinishDateAsync, getTeamIdPerUserAsync, selectTeamAsync
} from "../../services/web3/battle";

import { getPairInfo, getTokenInfo } from "../../services/graphql";
import { lookUpPrices } from "../../services/web3";

import { farms } from "../../helper/contractFarm";

import { getHashWarsInstance } from "../../services/web3/instance";

// Get Token Approve Status
export function* getBattleStartDateStatus() {
  yield takeEvery(actions.GET_BATTLE_START_DATE_STATUS, function* ({ payload}) {
    const { time } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const endDate = yield call(
      getBattleFinishDateAsync,
      tokenInstance.instance,
    );

    yield put({
      type: actions.GET_BATTLE_START_DATE_STATUS_SUCCESS,
      time,
      endDate: endDate,
    });
  });
}

// Get TeamId Per User
export function* getTeamIdPerUserStatus() {
  yield takeEvery(actions.GET_TEAM_ID_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const teamId = yield call(
      getTeamIdPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TEAM_ID_PER_USER_STATUS_SUCCESS,
      teamId
    });
  });
}

export function* selectTeam() {
  yield takeLatest(actions.SELECT_TEAM_STATUS, function* ({ payload }) {
    const { teamId, callback } = payload;
console.log("teamId", teamId);
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const selectTeamResponse = yield call(
      selectTeamAsync,
      tokenInstance.instance,
      web3,
      teamId,
      accounts[0]
    );

    if (selectTeamResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getBattleStartDateStatus),
    fork(getTeamIdPerUserStatus),
    fork(selectTeam),
  ]);
}
