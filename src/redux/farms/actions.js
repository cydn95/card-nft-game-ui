const actions = {
  // LP Token
  GET_TOKEN_BALANCE: "GET_TOKEN_BALANCE",
  GET_TOKEN_BALANCE_SUCCESS: "GET_TOKEN_BALANCE_SUCCESS",

  getTokenBalance: (token) => ({
    type: actions.GET_TOKEN_BALANCE,
    payload: { token },
  }),
};

export default actions;
