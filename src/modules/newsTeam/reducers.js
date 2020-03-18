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

export default (
  state = initialState,
  { type, newsTeamsData, newsTeamsError }
) => {
  switch (type) {
    case FETCH_NEWS_TEAMS_BEGIN:
      return {
        ...state,
        newsTeamsLoading: true,
        newsTeamsError: null,
      };

    case FETCH_NEWS_TEAMS_SUCCESS:
      return {
        ...state,
        newsTeamsLoading: false,
        newsTeamsData,
      };

    case FETCH_NEWS_TEAMS_FAILURE:
      return {
        ...state,
        newsTeamsLoading: false,
        newsTeamsError,
        newsTeamsData: [],
      };

    default:
      return state;
  }
};
