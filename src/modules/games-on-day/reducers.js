import {
  FETCH_GAMES_ON_DAY_BEGIN,
  FETCH_GAMES_ON_DAY_SUCCESS,
  FETCH_GAMES_ON_DAY_FAILURE,
} from "./actions";

const initialState = {
  gamesOnDayData: [],
  gamesOnDayLoading: false,
  gamesOnDayError: null,
};

export default (
  state = initialState,
  { type, gamesOnDayData, gamesOnDayError }
) => {
  switch (type) {
    case FETCH_GAMES_ON_DAY_BEGIN:
      return {
        ...state,
        gamesOnDayLoading: true,
        gamesOnDayError: null,
      };

    case FETCH_GAMES_ON_DAY_SUCCESS:
      return {
        ...state,
        gamesOnDayLoading: false,
        gamesOnDayData,
      };

    case FETCH_GAMES_ON_DAY_FAILURE:
      return {
        ...state,
        gamesOnDayLoading: false,
        gamesOnDayError,
        gamesOnDayData: [],
      };

    default:
      return state;
  }
};
