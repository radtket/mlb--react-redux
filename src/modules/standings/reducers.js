import {
  FETCH_STANDINGS_BEGIN,
  FETCH_STANDINGS_SUCCESS,
  FETCH_STANDINGS_FAILURE,
} from "./actions";

const initialState = {
  standings: [],
  standingsLoading: false,
  standingsError: null,
};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STANDINGS_BEGIN:
      // Mark the state as "standingsLoading" so we can show a spinner or something
      // Also, reset any standingsErrors. We're starting fresh.
      return {
        ...state,
        standingsLoading: true,
        standingsError: null,
      };

    case FETCH_STANDINGS_SUCCESS:
      // All done: set standingsLoading "false".
      // Also, replace the standings with the ones from the server
      return {
        ...state,
        standingsLoading: false,
        standings: payload.standings,
      };

    case FETCH_STANDINGS_FAILURE:
      // The request failed, but it did stop, so set standingsLoading to "false".
      // Save the standingsError, and we can display it somewhere
      // Since it failed, we don't have standings to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the standings
      // around! Do whatever seems right.
      return {
        ...state,
        standingsLoading: false,
        standingsError: payload.error,
        standings: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default reducers;
