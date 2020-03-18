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

export default (
  state = initialState,
  { type, allPlayersData, allPlayersError }
) => {
  switch (type) {
    case FETCH_ALL_PLAYERS_BEGIN:
      return {
        ...state,
        allPlayersLoading: true,
        allPlayersError: null,
      };

    case FETCH_ALL_PLAYERS_SUCCESS:
      return {
        ...state,
        allPlayersLoading: false,
        allPlayersData,
      };

    case FETCH_ALL_PLAYERS_FAILURE:
      return {
        ...state,
        allPlayersLoading: false,
        allPlayersError,
        allPlayersData: [],
      };

    default:
      return state;
  }
};
