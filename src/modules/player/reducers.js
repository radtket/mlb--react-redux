import {
  FETCH_PLAYER_BEGIN,
  FETCH_PLAYER_SUCCESS,
  FETCH_PLAYER_FAILURE,
} from "./actions";

const initialState = {
  playerData: {},
  playerLoading: false,
  playerError: null,
};

const playerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PLAYER_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        playerLoading: true,
        playerError: null,
      };

    case FETCH_PLAYER_SUCCESS:
      // All done: set loading "false".
      // Also, replace the playerData with the ones from the server
      return {
        ...state,
        playerLoading: false,
        playerData: payload.player,
      };

    case FETCH_PLAYER_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have playerData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the playerData
      // around! Do whatever seems right.
      return {
        ...state,
        playerLoading: false,
        playerError: payload.error,
        playerData: {},
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default playerReducer;
