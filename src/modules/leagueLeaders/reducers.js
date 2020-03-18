import {
  FETCH_LEAGUE_LEADERS_BEGIN,
  FETCH_LEAGUE_LEADERS_SUCCESS,
  FETCH_LEAGUE_LEADERS_FAILURE,
} from "./actions";

const initialState = {
  leagueLeadersData: {},
  leagueLeadersLoading: false,
  leagueLeadersError: null,
};

export default (
  state = initialState,
  { type, leagueLeadersData, leagueLeadersError }
) => {
  switch (type) {
    case FETCH_LEAGUE_LEADERS_BEGIN:
      return {
        ...state,
        leagueLeadersLoading: true,
        leagueLeadersError: null,
      };

    case FETCH_LEAGUE_LEADERS_SUCCESS:
      return {
        ...state,
        leagueLeadersLoading: false,
        leagueLeadersData,
      };

    case FETCH_LEAGUE_LEADERS_FAILURE:
      return {
        ...state,
        leagueLeadersLoading: false,
        leagueLeadersError,
        leagueLeadersData: {},
      };

    default:
      return state;
  }
};
