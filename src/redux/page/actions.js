const actions = {
  BUY_HERO_CARD_ETH: "BUY_HERO_CARD_ETH",

  GET_UNI_BALANCE: "GET_UNI_BALANCE",
  GET_UNI_BALANCE_SUCCESS: "GET_UNI_BALANCE_SUCCESS",

  GET_LP_BALANCE: "GET_LP_BALANCE",
  GET_LP_BALANCE_SUCCESS: "GET_LP_BALANCE_SUCCESS",

  GET_LP_EARNING: "GET_LP_EARNING",
  GET_LP_EARNING_SUCCESS: "GET_LP_EARNING_SUCCESS",

  GET_NDR_BALANCE: "GET_NDR_BALANCE",
  GET_NDR_BALANCE_SUCCESS: "GET_NDR_BALANCE_SUCCESS",

  DEPOSIT_LP: "DEPOSIT_LP",
  WITHDRAW_LP: "WITHDRAW_LP",

  buyHeroCardEth: (cardId, cardPrice, callback) => ({
    type: actions.BUY_HERO_CARD_ETH,
    payload: { cardId, cardPrice, callback },
  }),
  getNDRBalance: () => ({
    type: actions.GET_NDR_BALANCE,
  }),
  getUNIBalance: () => ({
    type: actions.GET_UNI_BALANCE,
  }),
  getLPBalance: () => ({
    type: actions.GET_LP_BALANCE,
  }),
  getLPEarning: () => ({
    type: actions.GET_LP_EARNING,
  }),
  depositLP: (amount, callback) => ({
    type: actions.DEPOSIT_LP,
    payload: { amount, callback },
  }),
  withdrawLP: (amount, callback) => ({
    type: actions.WITHDRAW_LP,
    payload: { amount, callback },
  }),
};

export default actions;
