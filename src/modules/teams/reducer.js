import {
  FETCH_TEAMS_BEGIN,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE
} from "./actions";

const initialState = {
  teamsData: [],
  teamsLoading: false,
  teamsError: null
};

export default function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAMS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        teamsLoading: true,
        teamsError: null
      };

    case FETCH_TEAMS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        teamsLoading: false,
        teamsData: action.payload.teams
      };

    case FETCH_TEAMS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        teamsLoading: false,
        teamsError: action.payload.error,
        teamsData: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
