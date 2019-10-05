import {
  FETCH_TEAM_RSS_NEWS_BEGIN,
  FETCH_TEAM_RSS_NEWS_SUCCESS,
  FETCH_TEAM_RSS_NEWS_FAILURE,
} from "./actions";

const initialState = {
  teamRssNewsData: [],
  teamRssNewsLoading: false,
  teamRssNewsError: null,
};

const teamRssNewsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TEAM_RSS_NEWS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        teamRssNewsLoading: true,
        teamRssNewsError: null,
      };

    case FETCH_TEAM_RSS_NEWS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the teamRssNewsData with the ones from the server
      return {
        ...state,
        teamRssNewsLoading: false,
        teamRssNewsData: payload.teamRssNews,
      };

    case FETCH_TEAM_RSS_NEWS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have teamRssNewsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the teamRssNewsData
      // around! Do whatever seems right.
      return {
        ...state,
        teamRssNewsLoading: false,
        teamRssNewsError: payload.error,
        teamRssNewsData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default teamRssNewsReducer;
