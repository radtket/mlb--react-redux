import {
  FETCH_NEWS_TEAMS_BEGIN,
  FETCH_NEWS_TEAMS_SUCCESS,
  FETCH_NEWS_TEAMS_FAILURE,
} from "./actions";

const initialState = {
  newsTeamsData: [],
  newsTeamsLoading: false,
  newsTeamsError: null,
};

const newsTeamReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_NEWS_TEAMS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        newsTeamsLoading: true,
        newsTeamsError: null,
      };

    case FETCH_NEWS_TEAMS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the newsTeamsData with the ones from the server
      return {
        ...state,
        newsTeamsLoading: false,
        newsTeamsData: payload.newsTeams,
      };

    case FETCH_NEWS_TEAMS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have newsTeamsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the newsTeamsData
      // around! Do whatever seems right.
      return {
        ...state,
        newsTeamsLoading: false,
        newsTeamsError: payload.error,
        newsTeamsData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default newsTeamReducer;
