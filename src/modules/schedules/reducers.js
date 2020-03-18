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

export default (state = initialState, { type, schedules, schedulesError }) => {
  switch (type) {
    case FETCH_SCHEDULES_BEGIN:
      return {
        ...state,
        schedulesLoading: true,
        schedulesError: null,
      };

    case FETCH_SCHEDULES_SUCCESS:
      return {
        ...state,
        schedulesLoading: false,
        schedules,
      };

    case FETCH_SCHEDULES_FAILURE:
      return {
        ...state,
        schedulesLoading: false,
        schedulesError,
        schedules: [],
      };

    default:
      return state;
  }
};
