import { all, takeLatest, call, put, fork, select } from "redux-saga/effects";

import actions from "./actions";
import Web3 from "web3";

import axios from "axios";
import BigNumber from "bignumber.js";

import {
  DEV_WEB3_WEBSOCKET_PROVIDER,
  PROD_WEB3_WEBSOCKET_PROVIDER,
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
} from "../../helper/contract";

import { STAKE_RESPONSE } from "../../helper/constant";

const { REACT_APP_BUILD_MODE } = process.env;

/**
 * Load Web3.js
 */
const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    // window.addEventListener("load", async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      // console.log("Injected web3 detected.");
      resolve(web3);
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      const web3 = new Web3(provider);
      // console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
    }
  });

// Helpers *********************************************************************************

const getEarningAsync = async (instance, address) => {
  return await instance.methods
    .earned(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const getBalanceAsync = async (instance, address) => {
  return await instance.methods
    .balanceOf(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const getAllowanceAsync = async (instance, owner, sender) => {
  return await instance.methods
    .allowance(owner, sender)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const depositAsync = async (instance, web3, amount, address) => {
  const response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  };

  return await instance.methods
    .stake(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: 160000,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const withdrawAsync = async (instance, web3, amount, address) => {
  const response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  };

  return await instance.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: 160000,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const approveAsync = async (instance, web3, amount, address, spender) => {
  const response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  };

  return await instance.methods
    .approve(
      spender,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: 160000,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// ******************************************************************************************
export function* buyHeroCardEth() {
  yield takeLatest(actions.BUY_HERO_CARD_ETH, function* ({ payload }) {
    const { cardId, cardPrice, callback } = payload;

    console.log(payload);
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
    console.log("address", accounts[0]);

    console.log(instance);

    const buyCardAsync = async (cardId, cardPrice, address) => {
      console.log(cardId, cardPrice, address);
      const response = await axios.get(
        "https://ethgasstation.info/json/ethgasAPI.json"
      );
      let prices = {
        low: response.data.safeLow / 10,
        medium: response.data.average / 10,
        high: response.data.fast / 10,
        fastest: Math.round(response.data.fastest / 10),
      };

      return await instance.methods
        .buy(cardId)
        .send({
          from: address,
          value: web3.utils.toWei(cardPrice.toString(), "ether"),
          gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
          gas: 160000,
        })
        .then((data) => {
          console.log("Buy Card Success Response", data);
          return data;
        })
        .catch((error) => {
          console.log("Buy Card Error Response", error);
          return error;
        });
    };

    const buyCardResponse = yield call(
      buyCardAsync,
      cardId,
      cardPrice,
      accounts[0]
    );

    console.log("buyCardResponse", buyCardResponse);

    if (callback) {
      callback(buyCardResponse.status);
    }
  });
}

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

export function* getUNIBalance() {
  yield takeLatest(actions.GET_UNI_BALANCE, function* ({ payload }) {
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

    const uniBalance = yield call(getBalanceAsync, instance, accounts[0]);

    yield put({
      type: actions.GET_UNI_BALANCE_SUCCESS,
      uniBalance: uniBalance,
    });
  });
}

export function* getLPBalance() {
  yield takeLatest(actions.GET_LP_BALANCE, function* ({ payload }) {
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

    const lpBalance = yield call(getBalanceAsync, instance, accounts[0]);

    yield put({
      type: actions.GET_LP_BALANCE_SUCCESS,
      lpBalance: lpBalance,
    });
  });
}

export function* getLPEarning() {
  yield takeLatest(actions.GET_LP_EARNING, function* ({ payload }) {
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

    const lpEarning = yield call(getEarningAsync, instance, accounts[0]);

    yield put({
      type: actions.GET_LP_EARNING_SUCCESS,
      lpEarning: lpEarning,
    });
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
    const uniBalance = yield call(getBalanceAsync, instance, accounts[0]);
    if (uniBalance < parseFloat(amount) * Math.pow(10, 18)) {
      callback(STAKE_RESPONSE.INSUFFICIENT);
      return;
    }

    // Check Allowance
    const uniAllowance = yield call(
      getAllowanceAsync,
      instance,
      accounts[0],
      lpStakingAddress
    );

    let depositResult;

    if (uniAllowance >= parseFloat(amount) * Math.pow(10, 18)) {
      // Stake
      depositResult = yield call(
        depositAsync,
        lpStakingInstance,
        web3,
        amount,
        accounts[0]
      );
    } else {
      // Approve
      const approveResult = yield call(
        approveAsync,
        instance,
        web3,
        amount,
        accounts[0],
        lpStakingAddress
      );

      if (approveResult.status) {
        depositResult = yield call(
          depositAsync,
          lpStakingInstance,
          web3,
          amount,
          accounts[0]
        );
      } else {
        callback(STAKE_RESPONSE.ERROR);
      }

      console.log("deposit Result", depositResult);
      if (depositResult.status) {
        callback(STAKE_RESPONSE.SUCCESS);
      } else {
        callback(STAKE_RESPONSE.ERROR);
      }
    }
  });
}

export function* withdrawLP() {
  yield takeLatest(actions.WITHDRAW_LP, function* ({ payload }) {
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

    // Check staked amount
    const lpBalance = yield call(
      getBalanceAsync,
      lpStakingInstance,
      accounts[0]
    );
    if (lpBalance < parseFloat(amount) * Math.pow(10, 18)) {
      callback(STAKE_RESPONSE.INSUFFICIENT);
      return;
    }

    const withdrawResult = yield call(
      withdrawAsync,
      lpStakingInstance,
      web3,
      amount,
      accounts[0]
    );

    if (withdrawResult.status) {
      callback(STAKE_RESPONSE.SUCCESS);
    } else {
      callback(STAKE_RESPONSE.ERROR);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(buyHeroCardEth),
    fork(getNDRBalance),
    fork(depositLP),
    fork(withdrawLP),
    fork(getLPBalance),
    fork(getLPEarning),
    fork(getUNIBalance),
  ]);
}
