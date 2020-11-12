import { all, takeLatest, call, put, fork } from "redux-saga/effects";
import axios from "axios";

import actions from "./actions";

import {
  DEV_LPSTAKING_ADDRESS,
  PROD_LPSTAKING_ADDRESS,
  DEV_LPSTAKING_ABI,
  PROD_LPSTAKING_ABI,
} from "../../helper/contract";

import { getWeb3 } from "../../services/web3";

import { getCardsAPI } from "../../services/axios/api";

const { REACT_APP_BUILD_MODE } = process.env;

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

export function* buyHeroCardEth() {
  yield takeLatest(actions.BUY_HERO_CARD_ETH, function* ({ payload }) {
    const { cardId, cardPrice, callback } = payload;

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
export default function* rootSaga() {
  yield all([fork(buyHeroCardEth), fork(getCards)]);
}
