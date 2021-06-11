import actions from "./actions";

const initState = {
  finishTeamId: {},
  finishTotalHashPerTeam1: {},
  finishTotalHashPerTeam2: {},
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_FINISH_TEAM_ID_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        finishTeamId: action.finishTeamId
      };
    case actions.GET_FINISH_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        finishTotalHashPerTeam1: action.finishTotalHashPerTeam1,
        finishTotalHashPerTeam2: action.finishTotalHashPerTeam2
      };
    default:
      return state;
  }
}
