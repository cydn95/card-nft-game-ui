const actions = {
  GET_BATTLE_START_DATE_STATUS: "GET_BATTLE_START_DATE_STATUS",
  GET_BATTLE_START_DATE_STATUS_SUCCESS: "GET_BATTLE_START_DATE_STATUS_SUCCESS",
  GET_TEAM_ID_PER_USER_STATUS: "GET_TEAM_ID_PER_USER_STATUS",
  GET_TEAM_ID_PER_USER_STATUS_SUCCESS: "GET_TEAM_ID_PER_USER_STATUS_SUCCESS",
  GET_TOTAL_HASH_PER_TEAM_STATUS: "GET_TOTAL_HASH_PER_TEAM_STATUS",
  GET_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS: "GET_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS",
  SELECT_TEAM_STATUS: "SELECT_TEAM_STATUS",
  SELECT_TEAM_STATUS_SUCCESS: "SELECT_TEAM_STATUS_SUCCESS",

  getBattleStartDateStatus: (time) => ({
    type: actions.GET_BATTLE_START_DATE_STATUS,
    payload: { time }
  }),
  getTeamIdPerUserStatus: () => ({
    type: actions.GET_TEAM_ID_PER_USER_STATUS,
    payload: {}
  }),
  getTotalHashPerTeamStatus: (teamId) => ({
    type: actions.GET_TOTAL_HASH_PER_TEAM_STATUS,
    payload: { teamId }
  }),

  selectTeam: (teamId, callback) => ({
    type: actions.SELECT_TEAM_STATUS,
    payload: { teamId, callback }
  }),
};

export default actions;
