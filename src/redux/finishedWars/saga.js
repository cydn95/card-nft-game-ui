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
import { finishedHashWars } from "../../helper/contractBattle";

import { getWeb3 } from "../../services/web3";
import {
  getTeamIdPerUserAsync,
  getTotalHashPerTeamAsync,
  getDayHashPerTeamAsync,
  getTotalHashPerUserAsync,
  getDayHashPerUserAsync,
  getTotalPowerPerTeamAsync,
  getTotalPowerPerUserAsync,
  getTotalNDRPerTeamAsync,
  getTotalNDRPerUserAsync,
  getTeamPlayersCountAsync,
  isApprovedAllAsync,
  approveAllCardsAsync,
  selectTeamAsync,
  stakeMultiCardAsync,
  getFeeAsync,
  approveNDRAsync,
  stakeNDRAsync,
  getNDRAllowanceAsync
} from "../../services/web3/battle";
import {
  getBalanceAsync,
} from "../../services/web3/lpStaking";
import {
  getActiveWarInstance,
  getFinishedWarsInstance,
  getNFTInstance,
  getFarmInstance
} from "../../services/web3/instance";

// Get TeamId Per User
export function* getFinishTeamIdPerUserStatus() {
  yield takeEvery(actions.GET_FINISH_TEAM_ID_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    let finishTeamId = [];

    for (let index = 0; index < finishedHashWars.length; index++) {
      const tokenInstance = getFinishedWarsInstance(web3, index);
      // Get Wallet Account
      const accounts = yield call(web3.eth.getAccounts);

      let teamId = yield call(
        getTeamIdPerUserAsync,
        tokenInstance.instance,
        accounts[0]
      );

      finishTeamId[index] = teamId;
    }

    yield put({
      type: actions.GET_FINISH_TEAM_ID_PER_USER_STATUS_SUCCESS,
      finishTeamId
    });
  });
}

// Get Total Hash Per Team
export function* getFinishTotalHashPerTeamStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_HASH_PER_TEAM_STATUS, function* () {
    const web3 = yield call(getWeb3);

    let finishTotalHashPerTeam1 = [];
    let finishTotalHashPerTeam2 = [];

    for (let index = 0; index < finishedHashWars.length; index++) {
      const tokenInstance = getFinishedWarsInstance(web3, index);

      const team1 = yield call(
        getTotalHashPerTeamAsync,
        tokenInstance.instance,
        1,
      );
      const team2 = yield call(
        getTotalHashPerTeamAsync,
        tokenInstance.instance,
        2,
      );
      finishTotalHashPerTeam1[index] = team1;
      finishTotalHashPerTeam2[index] = team2;
    }

    yield put({
      type: actions.GET_FINISH_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS,
      finishTotalHashPerTeam1,
      finishTotalHashPerTeam2
    });
  });
}

export default function* rootSaga() {
  yield all([
    fork(getFinishTeamIdPerUserStatus),
    fork(getFinishTotalHashPerTeamStatus),
  ]);
}
