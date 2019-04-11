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

export default function ticketReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TICKETS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        ticketsLoading: true,
        ticketsError: null,
      };

    case FETCH_TICKETS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the ticketsData with the ones from the server
      return {
        ...state,
        ticketsLoading: false,
        ticketsData: action.payload.tickets,
      };

    case FETCH_TICKETS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have ticketsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the ticketsData
      // around! Do whatever seems right.
      return {
        ...state,
        ticketsLoading: false,
        ticketsError: action.payload.error,
        ticketsData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
