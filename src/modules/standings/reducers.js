import {
  FETCH_STANDINGS_BEGIN,
  FETCH_STANDINGS_SUCCESS,
  FETCH_STANDINGS_FAILURE,
} from "./actions";

const initialState = {
  standings: [],
  standingsLoading: false,
  standingsError: null,
};

export default (state = initialState, { type, standingsError, standings }) => {
  switch (type) {
    case FETCH_STANDINGS_BEGIN:
      return {
        ...state,
        standingsLoading: true,
        standingsError: null,
      };

    case FETCH_STANDINGS_SUCCESS:
      return {
        ...state,
        standingsLoading: false,
        standings,
      };

    case FETCH_STANDINGS_FAILURE:
      return {
        ...state,
        standingsLoading: false,
        standingsError,
        standings: [],
      };

    default:
      return state;
  }
};
