import {
  FETCH_NEWS_ALL_TEAMS_BEGIN,
  FETCH_NEWS_ALL_TEAMS_SUCCESS,
  FETCH_NEWS_ALL_TEAMS_FAILURE,
} from "./actions";

const initialState = {
  newsAllTeamsData: [],
  newsAllLoading: false,
  newsAllError: null,
};

export default function newsAllTeamsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_ALL_TEAMS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        newsAllLoading: true,
        newsAllError: null,
      };

    case FETCH_NEWS_ALL_TEAMS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the newsAllTeamsData with the ones from the server
      return {
        ...state,
        newsAllLoading: false,
        newsAllTeamsData: action.payload.newsAllTeams,
      };

    case FETCH_NEWS_ALL_TEAMS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have newsAllTeamsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the newsAllTeamsData
      // around! Do whatever seems right.
      return {
        ...state,
        newsAllLoading: false,
        newsAllError: action.payload.error,
        newsAllTeamsData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
