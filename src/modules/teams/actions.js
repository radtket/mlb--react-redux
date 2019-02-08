import fetch from "cross-fetch";
import { handleErrors } from "../../utils/helpers";

export const FETCH_TEAMS_BEGIN = "FETCH_TEAMS_BEGIN";
export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS";
export const FETCH_TEAMS_FAILURE = "FETCH_TEAMS_FAILURE";

export const fetchTeamsBegin = () => ({
  type: FETCH_TEAMS_BEGIN
});

export const fetchTeamsSuccess = teams => ({
  type: FETCH_TEAMS_SUCCESS,
  payload: { teams }
});

export const fetchTeamsFailure = error => ({
  type: FETCH_TEAMS_FAILURE,
  payload: { error }
});

function getTeams() {
  return fetch("/data/teams-with-stadiums.json")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchTeams() {
  return dispatch => {
    dispatch(fetchTeamsBegin());
    return getTeams()
      .then(data => {
        dispatch(fetchTeamsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamsFailure(error)));
  };
}
