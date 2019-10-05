import {
  FETCH_TEAM_DEPTHS_BEGIN,
  FETCH_TEAM_DEPTHS_SUCCESS,
  FETCH_TEAM_DEPTHS_FAILURE,
} from "./actions";

const initialState = {
  teamDepthsData: {},
  teamDepthsLoading: false,
  teamDepthsError: null,
};

const teamDepthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TEAM_DEPTHS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        teamDepthsLoading: true,
        teamDepthsError: null,
      };

    case FETCH_TEAM_DEPTHS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the teamDepthsData with the ones from the server
      return {
        ...state,
        teamDepthsLoading: false,
        teamDepthsData: payload.teamDepths,
      };

    case FETCH_TEAM_DEPTHS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have teamDepthsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the teamDepthsData
      // around! Do whatever seems right.
      return {
        ...state,
        teamDepthsLoading: false,
        teamDepthsError: payload.error,
        teamDepthsData: {},
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default teamDepthReducer;
