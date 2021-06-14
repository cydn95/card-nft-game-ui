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
  withdrawNDRAsync,
  withdrawNFTAsync,
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

// Get Total Hash Per User
export function* getFinishTotalHashPerUserStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_HASH_PER_USER_STATUS, function* ({ payload }) {
    const { openRound } = payload;
    const index = openRound -1;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, index);
    const accounts = yield call(web3.eth.getAccounts);

    const finishTotalHashPerUser = yield call(
      getTotalHashPerUserAsync,
      tokenInstance.instance,
      accounts[0],
    );

    yield put({
      type: actions.GET_FINISH_TOTAL_HASH_PER_USER_STATUS_SUCCESS,
      finishTotalHashPerUser
    });
  });
}

// Get Total NFT Power Per Team
export function* getFinishTotalPowerPerTeamStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_POWER_PER_TEAM_STATUS, function* ({ payload }) {
    const { openRound,openTeam } = payload;
    const index = openRound -1;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, index);

    const finishTotalPowerPerTeam = yield call(
      getTotalPowerPerTeamAsync,
      tokenInstance.instance,
      openTeam
    );

    yield put({
      type: actions.GET_FINISH_TOTAL_POWER_PER_TEAM_STATUS_SUCCESS,
      finishTotalPowerPerTeam
    });
  });
}

// Get Total NFT Power Per User
export function* getFinishTotalPowerPerUserStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_POWER_PER_USER_STATUS, function* ({ payload }) {
    const { openRound } = payload;
    const index = openRound -1;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, index);
    const accounts = yield call(web3.eth.getAccounts);

    const finishTotalPowerPerUser = yield call(
      getTotalPowerPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_FINISH_TOTAL_POWER_PER_USER_STATUS_SUCCESS,
      finishTotalPowerPerUser
    });
  });
}

// Get Total NDR Amount Per Team
export function* getFinishTotalNDRPerTeamStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_NDR_PER_TEAM_STATUS, function* ({ payload }) {
    const { openRound, openTeam } = payload;
    const index = openRound -1;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, index);

    const finishTotalNDRPerTeam = yield call(
      getTotalNDRPerTeamAsync,
      tokenInstance.instance,
      openTeam
    );

    yield put({
      type: actions.GET_FINISH_TOTAL_NDR_PER_TEAM_STATUS_SUCCESS,
      finishTotalNDRPerTeam
    });
  });
}

// Get Total NDR Amount Per User
export function* getFinishTotalNDRPerUserStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_NDR_PER_USER_STATUS, function* ({ payload }) {
    const { openRound } = payload;
    const index = openRound -1;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, index);
    const accounts = yield call(web3.eth.getAccounts);

    const finishTotalNDRPerUser = yield call(
      getTotalNDRPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_FINISH_TOTAL_NDR_PER_USER_STATUS_SUCCESS,
      finishTotalNDRPerUser
    });
  });
}

// Get Total Team Players Count
export function* getFinishTeamPlayersCountStatus() {
  yield takeEvery(actions.GET_FINISH_TEAM_PLAYERS_COUNT_STATUS, function* ({ payload }) {
    const { openRound, openTeam } = payload;
    const index = openRound -1;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, index);

    const finishTeamPlayersCount = yield call(
      getTeamPlayersCountAsync,
      tokenInstance.instance,
      openTeam
    );

    yield put({
      type: actions.GET_FINISH_TEAM_PLAYERS_COUNT_STATUS_SUCCESS,
      finishTeamPlayersCount
    });
  });
}

export function* unstakeAll() {
  yield takeEvery(actions.UN_STAKE_ALL, function* ({ payload }) {
    const { openRound, callback } = payload;
    const index = openRound -1;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, index);
    const accounts = yield call(web3.eth.getAccounts);
console.log("index", index);
    const withdrawNDR = yield call(
      withdrawNDRAsync,
      tokenInstance.instance,
      web3,
      accounts[0]
    );
    console.log("withdrawNDR", withdrawNDR);
    const withdrawNFT = yield call(
      withdrawNFTAsync,
      tokenInstance.instance,
      web3,
      accounts[0]
    );
    console.log("withdrawNFT", withdrawNFT);
    if (withdrawNDR.status && withdrawNFT.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getFinishTeamIdPerUserStatus),
    fork(getFinishTotalHashPerTeamStatus),
    fork(getFinishTotalHashPerUserStatus),
    fork(getFinishTotalPowerPerTeamStatus),
    fork(getFinishTotalPowerPerUserStatus),
    fork(getFinishTotalNDRPerTeamStatus),
    fork(getFinishTotalNDRPerUserStatus),
    fork(getFinishTeamPlayersCountStatus),
    fork(unstakeAll),
  ]);
}
