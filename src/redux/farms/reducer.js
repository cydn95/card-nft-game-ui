import actions from "./actions";

const initState = {
  approved: {},
  balance: {},
  staked: {},
  claimable: {},
  apy: {},
  rewardPerDay: {}
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_TOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        balance: {
          ...state.balance,
          [action.token]: action.balance,
        },
      };
    default:
      return state;
  }
}
