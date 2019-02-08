import {
  FETCH_STANDINGS_BEGIN,
  FETCH_STANDINGS_SUCCESS,
  FETCH_STANDINGS_FAILURE
} from "./actions";

const initialState = {
  standingsData: [],
  loading: false,
  error: null
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_STANDINGS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_STANDINGS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the standingsData with the ones from the server
      return {
        ...state,
        loading: false,
        standingsData: action.payload.standings
      };

    case FETCH_STANDINGS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have standingsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the standingsData
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        standingsData: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
