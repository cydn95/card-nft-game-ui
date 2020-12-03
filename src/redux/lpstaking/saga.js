import { all, takeLatest, call, put, fork } from "redux-saga/effects";

import actions from "./actions";

import {
  DEV_LPSTAKING_OLD_ADDRESS,
  PROD_LPSTAKING_OLD_ADDRESS,
  DEV_LPSTAKING_OLD_ABI,
  PROD_LPSTAKING_OLD_ABI,
  DEV_LPSTAKING_ADDRESS,
  PROD_LPSTAKING_ADDRESS,
  DEV_LPSTAKING_ABI,
  PROD_LPSTAKING_ABI,
  DEV_NDR_ADDRESS,
  PROD_NDR_ADDRESS,
  DEV_NDR_ABI,
  PROD_NDR_ABI,
  DEV_UNISWAPV2PAIR_ADDRESS,
  PROD_UNISWAPV2PAIR_ADDRESS,
  DEV_UNISWAPV2PAIR_ABI,
  PROD_UNISWAPV2PAIR_ABI,
  WETH_TOKEN,
} from "../../helper/contract";
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

import { getTokenInfo, getPairInfo } from "../../services/graphql";
import { lookUpPrices } from "../../services/web3";

import {
  getLPStakingInstance,
  getNDRInstance,
  getUniInstance,
} from "../../services/web3/instance";

const { REACT_APP_BUILD_MODE } = process.env;

// Get LPToken Allowance
export function* getLPTokenAllowance() {
  yield takeLatest(actions.GET_ALLOWANCE_LP_TOKEN, function* ({ payload }) {
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    let lpStakingPoolAddress;

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_UNISWAPV2PAIR_ABI;
      instance = new web3.eth.Contract(abi, DEV_UNISWAPV2PAIR_ADDRESS);

      lpStakingPoolAddress = DEV_LPSTAKING_ADDRESS;
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_UNISWAPV2PAIR_ABI;
      instance = new web3.eth.Contract(abi, PROD_UNISWAPV2PAIR_ADDRESS);

      lpStakingPoolAddress = PROD_LPSTAKING_ADDRESS;
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const allowance = yield call(
      getAllowanceAsync,
      instance,
      accounts[0],
      lpStakingPoolAddress
    );

    yield put({
      type: actions.GET_ALLOWANCE_LP_TOKEN_SUCCESS,
      allowance: allowance,
    });
  });
}

// NDR balanec
export function* getNDRBalance() {
  yield takeLatest(actions.GET_NDR_BALANCE, function* ({ payload }) {
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_NDR_ABI;
      instance = new web3.eth.Contract(abi, DEV_NDR_ADDRESS);
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_NDR_ABI;
      instance = new web3.eth.Contract(abi, PROD_NDR_ADDRESS);
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const ndrBalance = yield call(getBalanceAsync, instance, accounts[0]);

    yield put({
      type: actions.GET_NDR_BALANCE_SUCCESS,
      ndrBalance: ndrBalance,
    });
  });
}

// LPToken Balance
export function* getLPTokenBalance() {
  yield takeLatest(actions.GET_LPTOKEN_BALANCE, function* ({ payload }) {
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_UNISWAPV2PAIR_ABI;
      instance = new web3.eth.Contract(abi, DEV_UNISWAPV2PAIR_ADDRESS);
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_UNISWAPV2PAIR_ABI;
      instance = new web3.eth.Contract(abi, PROD_UNISWAPV2PAIR_ADDRESS);
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const lpTokenBalance = yield call(getBalanceAsync, instance, accounts[0]);

    yield put({
      type: actions.GET_LPTOKEN_BALANCE_SUCCESS,
      lpTokenBalance: lpTokenBalance,
    });
  });
}

// Get Staked Amound
export function* getStakedAmount() {
  yield takeLatest(actions.GET_STAKED_AMOUNT, function* ({ payload }) {
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_LPSTAKING_ABI;
      instance = new web3.eth.Contract(abi, DEV_LPSTAKING_ADDRESS);
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_LPSTAKING_ABI;
      instance = new web3.eth.Contract(abi, PROD_LPSTAKING_ADDRESS);
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakedAmount = yield call(getBalanceAsync, instance, accounts[0]);

    yield put({
      type: actions.GET_STAKED_AMOUNT_SUCCESS,
      stakedAmount: stakedAmount,
    });
  });
}

export function* getOldStakedAmount() {
  yield takeLatest(actions.GET_OLD_STAKED_AMOUNT, function* ({ payload }) {
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_LPSTAKING_OLD_ABI;
      instance = new web3.eth.Contract(abi, DEV_LPSTAKING_OLD_ADDRESS);
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_LPSTAKING_OLD_ABI;
      instance = new web3.eth.Contract(abi, PROD_LPSTAKING_OLD_ADDRESS);
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const oldStakedAmount = yield call(getBalanceAsync, instance, accounts[0]);

    yield put({
      type: actions.GET_OLD_STAKED_AMOUNT_SUCCESS,
      oldStakedAmount: oldStakedAmount,
    });
  });
}

// Get Earning
export function* getEarningAmount() {
  yield takeLatest(actions.GET_EARNING_AMOUNT, function* ({ payload }) {
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_LPSTAKING_ABI;
      instance = new web3.eth.Contract(abi, DEV_LPSTAKING_ADDRESS);
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_LPSTAKING_ABI;
      instance = new web3.eth.Contract(abi, PROD_LPSTAKING_ADDRESS);
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const earningAmount = yield call(getEarningAsync, instance, accounts[0]);

    yield put({
      type: actions.GET_EARNING_AMOUNT_SUCCESS,
      earningAmount: earningAmount,
    });
  });
}

export function* approveLP() {
  yield takeLatest(actions.APPROVE_LP, function* ({ payload }) {
    const { callback } = payload;
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    let lpPoolAddress;

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_UNISWAPV2PAIR_ABI;
      instance = new web3.eth.Contract(abi, DEV_UNISWAPV2PAIR_ADDRESS);

      lpPoolAddress = DEV_LPSTAKING_ADDRESS;
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_UNISWAPV2PAIR_ABI;
      instance = new web3.eth.Contract(abi, PROD_UNISWAPV2PAIR_ADDRESS);

      lpPoolAddress = PROD_LPSTAKING_ADDRESS;
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check balance
    const lpBalance = yield call(getBalanceAsync, instance, accounts[0]);

    if (lpBalance <= 0) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    // Approve
    const approveResult = yield call(
      approveAsync,
      instance,
      web3,
      lpBalance,
      accounts[0],
      lpPoolAddress
    );

    console.log("approve result", approveResult);
    if (approveResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* depositLP() {
  yield takeLatest(actions.DEPOSIT_LP, function* ({ payload }) {
    const { amount, callback } = payload;
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    let lpStakingAddress;
    let lpStakingAbi;
    let lpStakingInstance;

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_UNISWAPV2PAIR_ABI;
      instance = new web3.eth.Contract(abi, DEV_UNISWAPV2PAIR_ADDRESS);

      lpStakingAbi = DEV_LPSTAKING_ABI;
      lpStakingAddress = DEV_LPSTAKING_ADDRESS;
      lpStakingInstance = new web3.eth.Contract(
        lpStakingAbi,
        DEV_LPSTAKING_ADDRESS
      );
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_UNISWAPV2PAIR_ABI;
      instance = new web3.eth.Contract(abi, PROD_UNISWAPV2PAIR_ADDRESS);

      lpStakingAbi = PROD_LPSTAKING_ABI;
      lpStakingAddress = PROD_LPSTAKING_ADDRESS;
      lpStakingInstance = new web3.eth.Contract(
        lpStakingAbi,
        PROD_LPSTAKING_ADDRESS
      );
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check balance
    const lpTokenBalance = yield call(getBalanceAsync, instance, accounts[0]);
    if (lpTokenBalance < parseFloat(amount) * Math.pow(10, 18)) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    // Check Allowance
    const uniAllowance = yield call(
      getAllowanceAsync,
      instance,
      accounts[0],
      lpStakingAddress
    );

    if (uniAllowance < parseFloat(amount) * Math.pow(10, 18)) {
      callback(RESPONSE.SHOULD_APPROVE);
      return;
    }

    const depositResult = yield call(
      depositAsync,
      lpStakingInstance,
      web3,
      amount,
      accounts[0]
    );

    console.log("deposit Result", depositResult);
    if (depositResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* withdrawLP() {
  yield takeLatest(actions.WITHDRAW_LP, function* ({ payload }) {
    const { amount, callback } = payload;
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_LPSTAKING_ABI;
      instance = new web3.eth.Contract(abi, DEV_LPSTAKING_ADDRESS);
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_LPSTAKING_ABI;
      instance = new web3.eth.Contract(abi, PROD_LPSTAKING_ADDRESS);
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check staked amount
    const lpBalance = yield call(getBalanceAsync, instance, accounts[0]);
    if (lpBalance < parseFloat(amount) * Math.pow(10, 18)) {
      callback(RESPONSE.SHOULD_STAKE);
      return;
    }

    const withdrawResult = yield call(
      withdrawAsync,
      instance,
      web3,
      amount,
      accounts[0]
    );

    if (withdrawResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* withdrawOldLP() {
  yield takeLatest(actions.WITHDRAW_OLD_LP, function* ({ payload }) {
    const { amount, callback } = payload;
    let abi;
    let instance;
    const web3 = yield call(getWeb3);

    if (REACT_APP_BUILD_MODE === "development") {
      abi = DEV_LPSTAKING_OLD_ABI;
      instance = new web3.eth.Contract(abi, DEV_LPSTAKING_OLD_ADDRESS);
    } else if (REACT_APP_BUILD_MODE === "production") {
      abi = PROD_LPSTAKING_OLD_ABI;
      instance = new web3.eth.Contract(abi, PROD_LPSTAKING_OLD_ADDRESS);
    }

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check staked amount
    const lpBalance = yield call(getBalanceAsync, instance, accounts[0]);
    if (lpBalance < parseFloat(amount) * Math.pow(10, 18)) {
      callback(RESPONSE.SHOULD_STAKE);
      return;
    }

    const withdrawResult = yield call(
      withdrawAsync,
      instance,
      web3,
      amount,
      accounts[0]
    );

    if (withdrawResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* getStatistics() {
  yield takeLatest(actions.GET_STATISTICS, function* () {
    const web3 = yield call(getWeb3);
    const uni = getUniInstance(web3);
    const lp = getLPStakingInstance(web3);

    const ethPrice = (yield call(lookUpPrices, ["ethereum"])).ethereum.usd;

    const pairtokenInfo = yield call(getPairInfo, PROD_UNISWAPV2PAIR_ADDRESS);

    const uniTotalSupply = yield call(getTotalSupply, uni.instance);

    const stakingTokenPriceEth =
      (pairtokenInfo.token0.derivedETH * pairtokenInfo.reserve0 +
        pairtokenInfo.token1.derivedETH * pairtokenInfo.reserve1) /
      (Number(uniTotalSupply) / Math.pow(10, 18));
    const stakingTokenPriceNDR =
      (stakingTokenPriceEth * pairtokenInfo.reserve0) / pairtokenInfo.reserve1;

    // console.log(
    //   ethPrice,
    //   pairtokenInfo,
    //   uniTotalSupply,
    //   stakingTokenPriceEth,
    //   stakingTokenPriceNDR
    // );

    // Get TVL
    const lockedAmount = yield call(getBalanceAsync, uni.instance, lp.address);
    const stakingTokenPrice =
      (pairtokenInfo.token0.derivedETH * ethPrice * pairtokenInfo.reserve0 +
        pairtokenInfo.token1.derivedETH * ethPrice * pairtokenInfo.reserve1) /
      (Number(uniTotalSupply) / Math.pow(10, 18));

    const tvl = (stakingTokenPrice * lockedAmount) / Math.pow(10, 18);

    // console.log(lockedAmount, tvl);

    yield put({
      type: actions.GET_STATISTICS_SUCCESS,
      stat: {
        tvl: tvl.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        lpPriceNDR: stakingTokenPriceNDR.toFixed(2),
        lpPriceETH: stakingTokenPriceEth.toFixed(2),
      },
    });
  });
}

export default function* rootSaga() {
  yield all([
    fork(getNDRBalance),
    fork(approveLP),
    fork(depositLP),
    fork(withdrawLP),
    fork(withdrawOldLP),
    fork(getStakedAmount),
    fork(getOldStakedAmount),
    fork(getEarningAmount),
    fork(getLPTokenBalance),
    fork(getLPTokenAllowance),
    fork(getStatistics),
  ]);
}
