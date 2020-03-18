import {
  FETCH_TEAM_ROSTER_BEGIN,
  FETCH_TEAM_ROSTER_SUCCESS,
  FETCH_TEAM_ROSTER_FAILURE,
} from "./actions";

const initialState = {
  teamRoster: [],
  teamRosterLoading: false,
  teamRosterError: null,
};

export default (
  state = initialState,
  { type, teamRoster, teamRosterError }
) => {
  switch (type) {
    case FETCH_TEAM_ROSTER_BEGIN:
      return {
        ...state,
        teamRosterLoading: true,
        teamRosterError: null,
      };

    case FETCH_TEAM_ROSTER_SUCCESS:
      return {
        ...state,
        teamRosterLoading: false,
        teamRoster,
      };

    case FETCH_TEAM_ROSTER_FAILURE:
      return {
        ...state,
        teamRosterLoading: false,
        teamRosterError,
        teamRoster: [],
      };

    default:
      return state;
  }
};
