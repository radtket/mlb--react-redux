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

export default (
  state = initialState,
  { type, teamDepthsError, teamDepthsData }
) => {
  switch (type) {
    case FETCH_TEAM_DEPTHS_BEGIN:
      return {
        ...state,
        teamDepthsLoading: true,
        teamDepthsError: null,
      };

    case FETCH_TEAM_DEPTHS_SUCCESS:
      return {
        ...state,
        teamDepthsLoading: false,
        teamDepthsData,
      };

    case FETCH_TEAM_DEPTHS_FAILURE:
      return {
        ...state,
        teamDepthsLoading: false,
        teamDepthsError,
        teamDepthsData: {},
      };

    default:
      return state;
  }
};
