import {
  all,
  takeLatest,
  call,
  put,
  fork,
  takeEvery,
} from "redux-saga/effects";

import actions from "./actions";
import { RESPONSE } from "../../helper/constant";
import { getWeb3 } from "../../services/web3";
import {
  getBattleFinishDateAsync,
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
} from "../../services/web3/battle";
import {
  getHashWarsInstance,
  getNFTInstance
} from "../../services/web3/instance";

// Get Token Approve Status
export function* getBattleStartDateStatus() {
  yield takeEvery(actions.GET_BATTLE_START_DATE_STATUS, function* ({ payload }) {
    const { time } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);

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

// Get Total Hash Per Team
export function* getTotalHashPerTeamStatus() {
  yield takeEvery(actions.GET_TOTAL_HASH_PER_TEAM_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);

    const totalHashPerTeam1 = yield call(
      getTotalHashPerTeamAsync,
      tokenInstance.instance,
      1,
    );
    const totalHashPerTeam2 = yield call(
      getTotalHashPerTeamAsync,
      tokenInstance.instance,
      2,
    );

    yield put({
      type: actions.GET_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS,
      totalHashPerTeam1,
      totalHashPerTeam2
    });
  });
}

// Get Day Hash Per Team
export function* getDayHashPerTeamStatus() {
  yield takeEvery(actions.GET_DAY_HASH_PER_TEAM_STATUS, function* ({ payload }) {
    const { teamId } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);

    const dayHashPerTeam = yield call(
      getDayHashPerTeamAsync,
      tokenInstance.instance,
      teamId,
    );

    yield put({
      type: actions.GET_DAY_HASH_PER_TEAM_STATUS_SUCCESS,
      dayHashPerTeam
    });
  });
}

// Get Total Hash Per User
export function* getTotalHashPerUserStatus() {
  yield takeEvery(actions.GET_TOTAL_HASH_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);
    const accounts = yield call(web3.eth.getAccounts);

    const totalHashPerUser = yield call(
      getTotalHashPerUserAsync,
      tokenInstance.instance,
      accounts[0],
    );

    yield put({
      type: actions.GET_TOTAL_HASH_PER_USER_STATUS_SUCCESS,
      totalHashPerUser
    });
  });
}

// Get Day Hash Per Team
export function* getDayHashPerUserStatus() {
  yield takeEvery(actions.GET_DAY_HASH_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);
    const accounts = yield call(web3.eth.getAccounts);

    const dayHashPerUser = yield call(
      getDayHashPerUserAsync,
      tokenInstance.instance,
      accounts[0],
    );

    yield put({
      type: actions.GET_DAY_HASH_PER_USER_STATUS_SUCCESS,
      dayHashPerUser
    });
  });
}

// Get Total NFT Power Per Team
export function* getTotalPowerPerTeamStatus() {
  yield takeEvery(actions.GET_TOTAL_POWER_PER_TEAM_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);

    const totalPowerPerTeam1 = yield call(
      getTotalPowerPerTeamAsync,
      tokenInstance.instance,
      1
    );
    const totalPowerPerTeam2 = yield call(
      getTotalPowerPerTeamAsync,
      tokenInstance.instance,
      2
    );

    yield put({
      type: actions.GET_TOTAL_POWER_PER_TEAM_STATUS_SUCCESS,
      totalPowerPerTeam1,
      totalPowerPerTeam2
    });
  });
}

// Get Total NFT Power Per User
export function* getTotalPowerPerUserStatus() {
  yield takeEvery(actions.GET_TOTAL_POWER_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);
    const accounts = yield call(web3.eth.getAccounts);

    const totalPowerPerUser = yield call(
      getTotalPowerPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOTAL_POWER_PER_USER_STATUS_SUCCESS,
      totalPowerPerUser
    });
  });
}

// Get Total NDR Amount Per Team
export function* getTotalNDRPerTeamStatus() {
  yield takeEvery(actions.GET_TOTAL_NDR_PER_TEAM_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);

    const totalNDRPerTeam1 = yield call(
      getTotalNDRPerTeamAsync,
      tokenInstance.instance,
      1
    );
    const totalNDRPerTeam2 = yield call(
      getTotalNDRPerTeamAsync,
      tokenInstance.instance,
      2
    );

    yield put({
      type: actions.GET_TOTAL_NDR_PER_TEAM_STATUS_SUCCESS,
      totalNDRPerTeam1,
      totalNDRPerTeam2
    });
  });
}

// Get Total NDR Amount Per User
export function* getTotalNDRPerUserStatus() {
  yield takeEvery(actions.GET_TOTAL_NDR_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);
    const accounts = yield call(web3.eth.getAccounts);

    const totalNDRPerUser = yield call(
      getTotalNDRPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOTAL_NDR_PER_USER_STATUS_SUCCESS,
      totalNDRPerUser
    });
  });
}

// Get Total Team Players Count
export function* getTeamPlayersCountStatus() {
  yield takeEvery(actions.GET_TEAM_PLAYERS_COUNT_STATUS, function* ({ payload }) {
    const { teamId } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getHashWarsInstance(web3);

    const teamPlayersCount = yield call(
      getTeamPlayersCountAsync,
      tokenInstance.instance,
      teamId
    );

    yield put({
      type: actions.GET_TEAM_PLAYERS_COUNT_STATUS_SUCCESS,
      teamPlayersCount: teamPlayersCount
    });
  });
}

export function* selectTeam() {
  yield takeLatest(actions.SELECT_TEAM_STATUS, function* ({ payload }) {
    const { teamId, callback } = payload;
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

export function* getApprovedStatus() {
  yield takeEvery(actions.GET_APPROVED_STATUS, function* ({ payload }) {
    const { callback } = payload;

    const web3 = yield call(getWeb3);
    const nft = getNFTInstance(web3);
    const nftStaking = getHashWarsInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);

    const approvedStatusResponse = yield call(
      isApprovedAllAsync,
      nft.instance,
      accounts[0],
      nftStaking.address
    );

    callback(approvedStatusResponse);
  });
}

export function* approveAll() {
  yield takeLatest(actions.APPROVE_ALL, function* ({ payload }) {
    const { approved, callback } = payload;

    const web3 = yield call(getWeb3);
    const nft = getNFTInstance(web3);
    const nftStaking = getHashWarsInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const approveResponse = yield call(
      approveAllCardsAsync,
      nft.instance,
      web3,
      nftStaking.address,
      approved,
      accounts[0]
    );

    if (approveResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* stakeCard() {
  yield takeLatest(actions.STAKE_CARD, function* ({ payload }) {
    const { cardIds, callback } = payload;

    const amounts = Array(cardIds.length).fill(1);
    const web3 = yield call(getWeb3);
    const nftStaking = getHashWarsInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakeCardResponse = yield call(
      stakeMultiCardAsync,
      nftStaking.instance,
      web3,
      cardIds,
      amounts,
      accounts[0]
    );

    if (stakeCardResponse.status) {
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
    fork(getTotalHashPerTeamStatus),
    fork(getDayHashPerTeamStatus),
    fork(getTotalHashPerUserStatus),
    fork(getDayHashPerUserStatus),
    fork(getTotalPowerPerTeamStatus),
    fork(getTotalPowerPerUserStatus),
    fork(getTotalNDRPerTeamStatus),
    fork(getTotalNDRPerUserStatus),
    fork(getTeamPlayersCountStatus),
    fork(getApprovedStatus),
    fork(approveAll),
    fork(selectTeam),
    fork(stakeCard),
  ]);
}
