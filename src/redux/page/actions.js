const actions = {
  BUY_HERO_CARD_ETH: "BUY_HERO_CARD_ETH",

  // LP Token
  GET_UNI_BALANCE: "GET_UNI_BALANCE",
  GET_UNI_BALANCE_SUCCESS: "GET_UNI_BALANCE_SUCCESS",

  // Staked Amount
  GET_LP_BALANCE: "GET_LP_BALANCE",
  GET_LP_BALANCE_SUCCESS: "GET_LP_BALANCE_SUCCESS",

  // Earnings
  GET_LP_EARNING: "GET_LP_EARNING",
  GET_LP_EARNING_SUCCESS: "GET_LP_EARNING_SUCCESS",

  GET_NDR_BALANCE: "GET_NDR_BALANCE",
  GET_NDR_BALANCE_SUCCESS: "GET_NDR_BALANCE_SUCCESS",

  GET_ALLOWANCE_LP_TOKEN: "GET_ALLOWANCE_LP_TOKEN",
  GET_ALLOWANCE_LP_TOKEN_SUCCESS: "GET_ALLOWANCE_LP_TOKEN_SUCCESS",

  APPROVE_LP: "APPROVE_LP",
  DEPOSIT_LP: "DEPOSIT_LP",
  WITHDRAW_LP: "WITHDRAW_LP",

  buyHeroCardEth: (cardId, cardPrice, callback) => ({
    type: actions.BUY_HERO_CARD_ETH,
    payload: { cardId, cardPrice, callback },
  }),
  getLPTokenAllowance: () => ({
    type: actions.GET_ALLOWANCE_LP_TOKEN,
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

  approveLP: (callback) => ({
    type: actions.APPROVE_LP,
    payload: { callback },
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
