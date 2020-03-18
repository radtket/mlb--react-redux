import {
  FETCH_TEAMS_BEGIN,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
} from "./actions";

const initialState = {
  teams: [],
  teamsLoading: false,
  teamsError: null,
};

export default (state = initialState, { type, teams, teamsError }) => {
  switch (type) {
    case FETCH_TEAMS_BEGIN:
      return {
        ...state,
        teamsLoading: true,
        teamsError: null,
      };

    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        teamsLoading: false,
        teams,
      };

    case FETCH_TEAMS_FAILURE:
      return {
        ...state,
        teamsLoading: false,
        teamsError,
        teams: [],
      };

    default:
      return state;
  }
};
