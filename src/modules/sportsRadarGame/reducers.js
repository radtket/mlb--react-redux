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

export default (
  state = initialState,
  { type, sportsRadarGamesData, sportsRadarGamesError }
) => {
  switch (type) {
    case FETCH_SPORTS_RADAR_GAMES_BEGIN:
      return {
        ...state,
        sportsRadarGamesLoading: true,
        sportsRadarGamesError: null,
      };

    case FETCH_SPORTS_RADAR_GAMES_SUCCESS:
      return {
        ...state,
        sportsRadarGamesLoading: false,
        sportsRadarGamesData,
      };

    case FETCH_SPORTS_RADAR_GAMES_FAILURE:
      return {
        ...state,
        sportsRadarGamesLoading: false,
        sportsRadarGamesError,
        sportsRadarGamesData: [],
      };

    default:
      return state;
  }
};
