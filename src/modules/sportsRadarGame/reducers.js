import {
  FETCH_SPORTS_RADAR_GAMES_BEGIN,
  FETCH_SPORTS_RADAR_GAMES_SUCCESS,
  FETCH_SPORTS_RADAR_GAMES_FAILURE,
} from "./actions";

const initialState = {
  sportsRadarGamesData: [],
  sportsRadarGamesLoading: false,
  sportsRadarGamesError: null,
};

export default function sportsRadarGamesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPORTS_RADAR_GAMES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        sportsRadarGamesLoading: true,
        sportsRadarGamesError: null,
      };

    case FETCH_SPORTS_RADAR_GAMES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the sportsRadarGamesData with the ones from the server
      return {
        ...state,
        sportsRadarGamesLoading: false,
        sportsRadarGamesData: action.payload.sportsRadarGames,
      };

    case FETCH_SPORTS_RADAR_GAMES_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have sportsRadarGamesData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the sportsRadarGamesData
      // around! Do whatever seems right.
      return {
        ...state,
        sportsRadarGamesLoading: false,
        sportsRadarGamesError: action.payload.error,
        sportsRadarGamesData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
