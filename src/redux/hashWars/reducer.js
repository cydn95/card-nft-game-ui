import actions from "./actions";

const initState = {
  endDate: {},
  teamId: {},
  totalHashPerTeam1: {},
  totalHashPerTeam2: {},
  dayHashPerTeam: {},
  totalHashPerUser: {},
  dayHashPerUser: {},
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_BATTLE_START_DATE_STATUS_SUCCESS:
      return {
        ...state,
        endDate: {
          ...state.endDate,
          [action.time]: action.endDate,
        },
      };
    case actions.GET_TEAM_ID_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        teamId: action.teamId
      };
    case actions.GET_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        totalHashPerTeam1: action.totalHashPerTeam1,
        totalHashPerTeam2: action.totalHashPerTeam2
      };
    case actions.GET_DAY_HASH_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        dayHashPerTeam: action.dayHashPerTeam,
      };
    case actions.GET_TOTAL_HASH_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        totalHashPerUser: action.totalHashPerUser,
      };
    case actions.GET_DAY_HASH_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        dayHashPerUser: action.dayHashPerUser,
      };
    default:
      return state;
  }
}
