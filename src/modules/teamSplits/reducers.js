import {
  FETCH_TEAM_SPLITS_BEGIN,
  FETCH_TEAM_SPLITS_SUCCESS,
  FETCH_TEAM_SPLITS_FAILURE,
} from "./actions";

const initialState = {
  teamSplitsData: {},
  teamSplitsLoading: false,
  teamSplitsError: null,
};

export default (
  state = initialState,
  { type, teamSplitsData, teamSplitsError }
) => {
  switch (type) {
    case FETCH_TEAM_SPLITS_BEGIN:
      return {
        ...state,
        teamSplitsLoading: true,
        teamSplitsError: null,
      };

    case FETCH_TEAM_SPLITS_SUCCESS:
      return {
        ...state,
        teamSplitsLoading: false,
        teamSplitsData,
      };

    case FETCH_TEAM_SPLITS_FAILURE:
      return {
        ...state,
        teamSplitsLoading: false,
        teamSplitsError,
        teamSplitsData: {},
      };

    default:
      return state;
  }
};
