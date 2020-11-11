import actions from "./actions";
const initState = {
  ndrBalance: 0,
  uniBalance: 0,  // lptoken amount
  lpBalance: 0,   // staked amount
  lpEarning: 0,   // earning
  allowance: 0,
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_NDR_BALANCE_SUCCESS:
      return {
        ...state,
        ndrBalance: action.ndrBalance,
      };
    case actions.GET_LP_BALANCE_SUCCESS:
      return {
        ...state,
        lpBalance: action.lpBalance,
      };
    case actions.GET_LP_EARNING_SUCCESS:
      return {
        ...state,
        lpEarning: action.lpEarning,
      };
    case actions.GET_UNI_BALANCE_SUCCESS:
      return {
        ...state,
        uniBalance: action.uniBalance,
      };
    case actions.GET_ALLOWANCE_LP_TOKEN_SUCCESS:
      return {
        ...state,
        allowance: action.allowance,
      };
    default:
      return state;
  }
}
