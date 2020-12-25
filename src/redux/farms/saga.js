import { all, takeLatest, call, put, fork } from "redux-saga/effects";

import BigNumber from "bignumber.js";

import actions from "./actions";

import { PROD_UNISWAPV2PAIR_ADDRESS } from "../../helper/contract";
import { RESPONSE } from "../../helper/constant";

import { getWeb3 } from "../../services/web3";
import {
  getEarningAsync,
  getBalanceAsync,
  getAllowanceAsync,
  depositAsync,
  withdrawAsync,
  approveAsync,
  getTotalSupply,
} from "../../services/web3/lpStaking";

import { getPairInfo } from "../../services/graphql";
import { lookUpPrices } from "../../services/web3";

import { getFarmInstance } from "../../services/web3/instance";

// NDR balanec
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

export default function* rootSaga() {
  yield all([fork(getTokenBalance)]);
}
