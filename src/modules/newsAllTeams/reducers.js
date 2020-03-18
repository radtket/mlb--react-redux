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

export default (
  state = initialState,
  { type, newsAllTeamsData, newsAllError }
) => {
  switch (type) {
    case FETCH_NEWS_ALL_TEAMS_BEGIN:
      return {
        ...state,
        newsAllLoading: true,
        newsAllError: null,
      };

    case FETCH_NEWS_ALL_TEAMS_SUCCESS:
      return {
        ...state,
        newsAllLoading: false,
        newsAllTeamsData,
      };

    case FETCH_NEWS_ALL_TEAMS_FAILURE:
      return {
        ...state,
        newsAllLoading: false,
        newsAllError,
        newsAllTeamsData: [],
      };

    default:
      return state;
  }
};
