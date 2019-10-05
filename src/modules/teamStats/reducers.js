import {
  FETCH_TEAM_STATS_BEGIN,
  FETCH_TEAM_STATS_SUCCESS,
  FETCH_TEAM_STATS_FAILURE,
} from "./actions";

const initialState = {
  teamStatsData: [],
  teamStatsLoading: false,
  teamStatsError: null,
};

const teamStatsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TEAM_STATS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        teamStatsLoading: true,
        teamStatsError: null,
      };

    case FETCH_TEAM_STATS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the teamStatsData with the ones from the server
      return {
        ...state,
        teamStatsLoading: false,
        teamStatsData: payload.teamStats,
      };

    case FETCH_TEAM_STATS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have teamStatsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the teamStatsData
      // around! Do whatever seems right.
      return {
        ...state,
        teamStatsLoading: false,
        teamStatsError: payload.error,
        teamStatsData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default teamStatsReducer;
