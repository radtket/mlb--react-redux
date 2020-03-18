import {
  FETCH_PLAYER_STATS_BEGIN,
  FETCH_PLAYER_STATS_SUCCESS,
  FETCH_PLAYER_STATS_FAILURE,
} from "./actions";

const initialState = {
  playerStatsData: {},
  playerStatsLoading: false,
  playerStatsError: null,
};

export default (
  state = initialState,
  { type, playerStatsData, playerStatsError }
) => {
  switch (type) {
    case FETCH_PLAYER_STATS_BEGIN:
      return {
        ...state,
        playerStatsLoading: true,
        playerStatsError: null,
      };

    case FETCH_PLAYER_STATS_SUCCESS:
      return {
        ...state,
        playerStatsLoading: false,
        playerStatsData,
      };

    case FETCH_PLAYER_STATS_FAILURE:
      return {
        ...state,
        playerStatsLoading: false,
        playerStatsError,
        playerStatsData: {},
      };

    default:
      return state;
  }
};
