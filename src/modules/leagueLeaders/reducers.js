import {
  FETCH_LEAGUE_LEADERS_BEGIN,
  FETCH_LEAGUE_LEADERS_SUCCESS,
  FETCH_LEAGUE_LEADERS_FAILURE,
} from "./actions";

const initialState = {
  leagueLeadersData: [],
  leagueLeadersLoading: false,
  leagueLeadersError: null,
};

export default function leagueLeadersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAGUE_LEADERS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        leagueLeadersLoading: true,
        leagueLeadersError: null,
      };

    case FETCH_LEAGUE_LEADERS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the leagueLeadersData with the ones from the server
      return {
        ...state,
        leagueLeadersLoading: false,
        leagueLeadersData: action.payload.leagueLeaders,
      };

    case FETCH_LEAGUE_LEADERS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have leagueLeadersData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the leagueLeadersData
      // around! Do whatever seems right.
      return {
        ...state,
        leagueLeadersLoading: false,
        leagueLeadersError: action.payload.error,
        leagueLeadersData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
