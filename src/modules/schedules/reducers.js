import {
  FETCH_SCHEDULES_BEGIN,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_FAILURE,
} from "./actions";

const initialState = {
  schedules: [],
  schedulesLoading: false,
  schedulesError: null,
};

const schedulesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SCHEDULES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        schedulesLoading: true,
        schedulesError: null,
      };

    case FETCH_SCHEDULES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the schedules with the ones from the server
      return {
        ...state,
        schedulesLoading: false,
        schedules: payload.schedules,
      };

    case FETCH_SCHEDULES_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have schedules to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the schedules
      // around! Do whatever seems right.
      return {
        ...state,
        schedulesLoading: false,
        schedulesError: payload.error,
        schedules: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default schedulesReducer;
