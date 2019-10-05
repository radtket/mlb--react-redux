import {
  FETCH_STADIUMS_BEGIN,
  FETCH_STADIUMS_SUCCESS,
  FETCH_STADIUMS_FAILURE,
} from "./actions";

const initialState = {
  stadiumsData: [],
  stadiumsLoading: false,
  stadiumsError: null,
};

const stadiumReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STADIUMS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        stadiumsLoading: true,
        stadiumsError: null,
      };

    case FETCH_STADIUMS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the stadiumsData with the ones from the server
      return {
        ...state,
        stadiumsLoading: false,
        stadiumsData: payload.stadiums,
      };

    case FETCH_STADIUMS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have stadiumsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the stadiumsData
      // around! Do whatever seems right.
      return {
        ...state,
        stadiumsLoading: false,
        stadiumsError: payload.error,
        stadiumsData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default stadiumReducer;
