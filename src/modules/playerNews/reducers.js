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

export default function playerNewsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAYER_NEWS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        playerNewsLoading: true,
        playerNewsError: null,
      };

    case FETCH_PLAYER_NEWS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the playerNewsData with the ones from the server
      return {
        ...state,
        playerNewsLoading: false,
        playerNewsData: action.payload.playerNews,
      };

    case FETCH_PLAYER_NEWS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have playerNewsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the playerNewsData
      // around! Do whatever seems right.
      return {
        ...state,
        playerNewsLoading: false,
        playerNewsError: action.payload.error,
        playerNewsData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
