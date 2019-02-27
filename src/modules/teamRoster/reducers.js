import {
  FETCH_TEAM_ROSTER_BEGIN,
  FETCH_TEAM_ROSTER_SUCCESS,
  FETCH_TEAM_ROSTER_FAILURE,
} from "./actions";

const initialState = {
  teamRosterData: [],
  teamRosterLoading: false,
  teamRosterError: null,
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAM_ROSTER_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        teamRosterLoading: true,
        teamRosterError: null,
      };

    case FETCH_TEAM_ROSTER_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        teamRosterLoading: false,
        teamRosterData: action.payload.teamRoster,
      };

    case FETCH_TEAM_ROSTER_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        teamRosterLoading: false,
        teamRosterError: action.payload.error,
        teamRosterData: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
