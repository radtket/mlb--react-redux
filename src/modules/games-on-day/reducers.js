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

const gamesOnDayReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_GAMES_ON_DAY_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        gamesOnDayLoading: true,
        gamesOnDayError: null,
      };

    case FETCH_GAMES_ON_DAY_SUCCESS:
      // All done: set loading "false".
      // Also, replace the gamesOnDayData with the ones from the server
      return {
        ...state,
        gamesOnDayLoading: false,
        gamesOnDayData: payload.gamesOnDay,
      };

    case FETCH_GAMES_ON_DAY_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have gamesOnDayData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the gamesOnDayData
      // around! Do whatever seems right.
      return {
        ...state,
        gamesOnDayLoading: false,
        gamesOnDayError: payload.error,
        gamesOnDayData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default gamesOnDayReducer;
