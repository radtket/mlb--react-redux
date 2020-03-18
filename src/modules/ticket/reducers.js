import {
  FETCH_TICKETS_BEGIN,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
} from "./actions";

const initialState = {
  ticketsData: [],
  ticketsLoading: false,
  ticketsError: null,
};

export default (state = initialState, { type, ticketsData, ticketsError }) => {
  switch (type) {
    case FETCH_TICKETS_BEGIN:
      return {
        ...state,
        ticketsLoading: true,
        ticketsError: null,
      };

    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        ticketsLoading: false,
        ticketsData,
      };

    case FETCH_TICKETS_FAILURE:
      return {
        ...state,
        ticketsLoading: false,
        ticketsError,
        ticketsData: [],
      };

    default:
      return state;
  }
};
