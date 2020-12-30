import { all, takeLatest, call, put, fork, takeEvery } from "redux-saga/effects";

import BigNumber from "bignumber.js";

import actions from "./actions";

import { RESPONSE } from "../../helper/constant";

import { getWeb3 } from "../../services/web3";
import {
  getEarningAsync,
  getBalanceAsync,
  getAllowanceAsync,
  getRewardRateAsync,
  getTotalSupplyAsync,
  approveAsync,
  depositAsync,
  claimAsync,
  exitAsync,
} from "../../services/web3/lpStaking";

import { getPairInfo } from "../../services/graphql";

import { getFarmInstance } from "../../services/web3/instance";

// Get Token Approve Status
export function* getTokenApproveStatus() {
  yield takeLatest(actions.GET_TOKEN_APPROVE_STATUS, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const allowance = yield call(
      getAllowanceAsync,
      tokenInstance.token.instance,
      accounts[0],
      tokenInstance.staking.address
    );

    yield put({
      type: actions.GET_TOKEN_APPROVE_STATUS_SUCCESS,
      token,
      approved: allowance > 0,
    });
  });
}

// Token balance
export function* getTokenBalance() {
  yield takeLatest(actions.GET_TOKEN_BALANCE, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const balance = yield call(
      getBalanceAsync,
      tokenInstance.token.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOKEN_BALANCE_SUCCESS,
      token,
      balance,
    });
  });
}

// Get Staked Amount
export function* getTokenStakedAmount() {
  yield takeLatest(actions.GET_TOKEN_STAKED_AMOUNT, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakedAmount = yield call(
      getBalanceAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOKEN_STAKED_AMOUNT_SUCCESS,
      token,
      staked: stakedAmount,
    });
  });
}

// Get Claimable Amount
export function* getTokenClaimableAmount() {
  yield takeLatest(actions.GET_TOKEN_CLAIMABLE_AMOUNT, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const claimableAmount = yield call(
      getEarningAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOKEN_CLAIMABLE_AMOUNT_SUCCESS,
      token,
      claimable: claimableAmount,
    });
  });
}

// Get Token Stats
export function* getTokenStats() {
  yield takeEvery(actions.GET_TOKEN_STATISTICS, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakedAmount = yield call(
      getBalanceAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );
    const rewardRate = yield call(
      getRewardRateAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );
    const totalSupply = yield call(
      getTotalSupplyAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );

    // NDR per day
    const claimablePerDay =
      totalSupply > 0 ? (stakedAmount * rewardRate * 86400) / totalSupply : 0;

    const pairtokenInfo = yield call(getPairInfo, tokenInstance.token.prodAddress);

    const uniTotalSupply = yield call(
      getTotalSupplyAsync,
      tokenInstance.token.instance
    );

    const stakingTokenPriceEth =
      (pairtokenInfo.token0.derivedETH * pairtokenInfo.reserve0 +
        pairtokenInfo.token1.derivedETH * pairtokenInfo.reserve1) /
      (Number(uniTotalSupply) / Math.pow(10, 18)) /
      2;

    const apy =
      stakedAmount > 0
        ? ((stakingTokenPriceEth * rewardRate * 86400) / stakedAmount) * 100
        : 0;

    yield put({
      type: actions.GET_TOKEN_STATISTICS_SUCCESS,
      token,
      stats: {
        apy,
        rewardPerDay: claimablePerDay,
      },
    });
  });
}

export function* approveToken() {
  yield takeLatest(actions.APPROVE_TOKEN, function* ({ payload }) {
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check balance
    const tokenBalance = yield call(
      getBalanceAsync,
      tokenInstance.token.instance,
      accounts[0]
    );

    if (tokenBalance <= 0) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    // Approve
    const approveResult = yield call(
      approveAsync,
      tokenInstance.token.instance,
      web3,
      tokenBalance,
      accounts[0],
      tokenInstance.staking.address
    );

    if (approveResult.status) {
      yield put({
        type: actions.GET_TOKEN_APPROVE_STATUS,
        payload: { token },
      });

      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* stakeToken() {
  yield takeLatest(actions.STAKE_TOKEN, function* ({ payload }) {
    const { token, amount, isMax, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check balance
    const tokenBalance = yield call(
      getBalanceAsync,
      tokenInstance.token.instance,
      accounts[0]
    );

    const stakeAmount = isMax
      ? new BigNumber(tokenBalance)
      : new BigNumber(amount).times(new BigNumber(10).pow(18));

    if (new BigNumber(tokenBalance).comparedTo(stakeAmount) === -1) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    // Check Allowance
    const tokenAllowance = yield call(
      getAllowanceAsync,
      tokenInstance.token.instance,
      accounts[0],
      tokenInstance.staking.address
    );

    if (new BigNumber(tokenAllowance).comparedTo(stakeAmount) === -1) {
      callback(RESPONSE.SHOULD_APPROVE);
      return;
    }

    const stakeResult = yield call(
      depositAsync,
      tokenInstance.staking.instance,
      web3,
      stakeAmount,
      accounts[0]
    );

    // console.log("deposit Result", depositResult);
    if (stakeResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* claimToken() {
  yield takeLatest(actions.CLIAM_TOKEN, function* ({ payload }) {
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const claimResponse = yield call(
      claimAsync,
      tokenInstance.staking.instance,
      web3,
      accounts[0]
    );

    if (claimResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* exitToken() {
  yield takeLatest(actions.EXIT_TOKEN, function* ({ payload }) {
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const exitResponse = yield call(
      exitAsync,
      tokenInstance.staking.instance,
      web3,
      accounts[0]
    );

    if (exitResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getTokenBalance),
    fork(getTokenStakedAmount),
    fork(getTokenApproveStatus),
    fork(getTokenClaimableAmount),
    fork(getTokenStats),
    fork(approveToken),
    fork(stakeToken),
    fork(claimToken),
    fork(exitToken),
  ]);
}
