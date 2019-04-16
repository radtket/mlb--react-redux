import {
  FETCH_TEAM_SPLITS_BEGIN,
  FETCH_TEAM_SPLITS_SUCCESS,
  FETCH_TEAM_SPLITS_FAILURE,
} from "./actions";

const initialState = {
  teamSplitsData: {},
  teamSplitsLoading: false,
  teamSplitsError: null,
};

export default function teamSplitsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAM_SPLITS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        teamSplitsLoading: true,
        teamSplitsError: null,
      };

    case FETCH_TEAM_SPLITS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the teamSplitsData with the ones from the server
      return {
        ...state,
        teamSplitsLoading: false,
        teamSplitsData: action.payload.teamSplits,
      };

    case FETCH_TEAM_SPLITS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have teamSplitsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the teamSplitsData
      // around! Do whatever seems right.
      return {
        ...state,
        teamSplitsLoading: false,
        teamSplitsError: action.payload.error,
        teamSplitsData: {},
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
