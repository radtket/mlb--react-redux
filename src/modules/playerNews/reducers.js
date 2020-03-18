import {
  FETCH_PLAYER_NEWS_BEGIN,
  FETCH_PLAYER_NEWS_SUCCESS,
  FETCH_PLAYER_NEWS_FAILURE,
} from "./actions";

const initialState = {
  playerNewsData: [],
  playerNewsLoading: false,
  playerNewsError: null,
};

export default (
  state = initialState,
  { type, playerNewsData, playerNewsError }
) => {
  switch (type) {
    case FETCH_PLAYER_NEWS_BEGIN:
      return {
        ...state,
        playerNewsLoading: true,
        playerNewsError: null,
      };

    case FETCH_PLAYER_NEWS_SUCCESS:
      return {
        ...state,
        playerNewsLoading: false,
        playerNewsData,
      };

    case FETCH_PLAYER_NEWS_FAILURE:
      return {
        ...state,
        playerNewsLoading: false,
        playerNewsError,
        playerNewsData: [],
      };

    default:
      return state;
  }
};
