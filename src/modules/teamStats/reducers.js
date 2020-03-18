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

export default (
  state = initialState,
  { type, teamStatsData, teamStatsError }
) => {
  switch (type) {
    case FETCH_TEAM_STATS_BEGIN:
      return {
        ...state,
        teamStatsLoading: true,
        teamStatsError: null,
      };

    case FETCH_TEAM_STATS_SUCCESS:
      return {
        ...state,
        teamStatsLoading: false,
        teamStatsData,
      };

    case FETCH_TEAM_STATS_FAILURE:
      return {
        ...state,
        teamStatsLoading: false,
        teamStatsError,
        teamStatsData: [],
      };

    default:
      return state;
  }
};
