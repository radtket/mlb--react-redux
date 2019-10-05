import {
  FETCH_ALL_PLAYERS_BEGIN,
  FETCH_ALL_PLAYERS_SUCCESS,
  FETCH_ALL_PLAYERS_FAILURE,
} from "./actions";

const initialState = {
  allPlayersData: [],
  allPlayersLoading: false,
  allPlayersError: null,
};

const allPlayerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_PLAYERS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        allPlayersLoading: true,
        allPlayersError: null,
      };

    case FETCH_ALL_PLAYERS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the allPlayersData with the ones from the server
      return {
        ...state,
        allPlayersLoading: false,
        allPlayersData: payload.allPlayers,
      };

    case FETCH_ALL_PLAYERS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have allPlayersData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the allPlayersData
      // around! Do whatever seems right.
      return {
        ...state,
        allPlayersLoading: false,
        allPlayersError: payload.error,
        allPlayersData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default allPlayerReducer;
