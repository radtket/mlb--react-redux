import { handleErrors } from "../../utils/helpers";
// import apiHeaders from "../../utils/api";

export const FETCH_TEAM_ROSTER_BEGIN = "FETCH_TEAM_ROSTER_BEGIN";
export const FETCH_TEAM_ROSTER_SUCCESS = "FETCH_TEAM_ROSTER_SUCCESS";
export const FETCH_TEAM_ROSTER_FAILURE = "FETCH_TEAM_ROSTER_FAILURE";

export const fetchTeamRosterBegin = () => ({
  type: FETCH_TEAM_ROSTER_BEGIN
});

export const fetchTeamRosterSuccess = teamRoster => ({
  type: FETCH_TEAM_ROSTER_SUCCESS,
  payload: { teamRoster }
});

export const fetchTeamRosterFailure = error => ({
  type: FETCH_TEAM_ROSTER_FAILURE,
  payload: { error }
});

function getTeamRoster() {
  // function getTeamRoster(teamArg) {
  // return fetch(
  //   `https://api.fantasydata.net/v3/mlb/scores/JSON/Players/${teamArg}`,
  //   apiHeaders
  // )
  return fetch("/data/roster.json")
    .then(handleErrors)
    .then(res => res.json());
}

// export function fetchTeamRoster(teamArg) {
export function fetchTeamRoster() {
  return dispatch => {
    dispatch(fetchTeamRosterBegin());
    // return getTeamRoster(teamArg)
    return getTeamRoster()
      .then(data => {
        dispatch(fetchTeamRosterSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamRosterFailure(error)));
  };
}
