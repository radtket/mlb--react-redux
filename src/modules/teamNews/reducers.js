import {
  FETCH_TEAM_NEWS_BEGIN,
  FETCH_TEAM_NEWS_SUCCESS,
  FETCH_TEAM_NEWS_FAILURE,
} from "./actions";

const initialState = {
  teamNewsData: [],
  teamNewsLoading: false,
  teamNewsError: null,
};

export default function teamNewsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAM_NEWS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        teamNewsLoading: true,
        teamNewsError: null,
      };

    case FETCH_TEAM_NEWS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the teamNewsData with the ones from the server
      return {
        ...state,
        teamNewsLoading: false,
        teamNewsData: action.payload.teamNews,
      };

    case FETCH_TEAM_NEWS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have teamNewsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the teamNewsData
      // around! Do whatever seems right.
      return {
        ...state,
        teamNewsLoading: false,
        teamNewsError: action.payload.error,
        teamNewsData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
