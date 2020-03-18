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

export default (
  state = initialState,
  { type, teamRssNewsData, teamRssNewsError }
) => {
  switch (type) {
    case FETCH_TEAM_RSS_NEWS_BEGIN:
      return {
        ...state,
        teamRssNewsLoading: true,
        teamRssNewsError: null,
      };

    case FETCH_TEAM_RSS_NEWS_SUCCESS:
      return {
        ...state,
        teamRssNewsLoading: false,
        teamRssNewsData,
      };

    case FETCH_TEAM_RSS_NEWS_FAILURE:
      return {
        ...state,
        teamRssNewsLoading: false,
        teamRssNewsError,
        teamRssNewsData: [],
      };

    default:
      return state;
  }
};
