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

export default (state = initialState, { type, playerData, playerError }) => {
  switch (type) {
    case FETCH_PLAYER_BEGIN:
      return {
        ...state,
        playerLoading: true,
        playerError: null,
      };

    case FETCH_PLAYER_SUCCESS:
      return {
        ...state,
        playerLoading: false,
        playerData,
      };

    case FETCH_PLAYER_FAILURE:
      return {
        ...state,
        playerLoading: false,
        playerError,
        playerData: {},
      };

    default:
      return state;
  }
};
