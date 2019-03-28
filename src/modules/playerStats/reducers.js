import {
  FETCH_PLAYER_STATS_BEGIN,
  FETCH_PLAYER_STATS_SUCCESS,
  FETCH_PLAYER_STATS_FAILURE,
} from "./actions";

const initialState = {
  playerStatsData: [],
  playerStatsLoading: false,
  playerStatsError: null,
};

export default function playerStatsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAYER_STATS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        playerStatsLoading: true,
        playerStatsError: null,
      };

    case FETCH_PLAYER_STATS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the playerStatsData with the ones from the server
      return {
        ...state,
        playerStatsLoading: false,
        playerStatsData: action.payload.playerStats,
      };

    case FETCH_PLAYER_STATS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have playerStatsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the playerStatsData
      // around! Do whatever seems right.
      return {
        ...state,
        playerStatsLoading: false,
        playerStatsError: action.payload.error,
        playerStatsData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
