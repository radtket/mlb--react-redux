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
  // TODO: Add When API is Live
  // function getTeamRoster(teamArg) {
  // return fetch(
  //   `https://api.fantasydata.net/v3/mlb/scores/JSON/Players/${teamArg}`,
  //   apiHeaders
  // )
  return fetch("/data/roster.json")
    .then(handleErrors)
    .then(res => res.json());
}

// TODO: Add When API is Live
// export function fetchTeamRoster(teamArg) {
export function fetchTeamRoster() {
  return dispatch => {
    dispatch(fetchTeamRosterBegin());
    // TODO: Add When API is Live
    // return getTeamRoster(teamArg)
    return getTeamRoster()
      .then(data => {
        dispatch(fetchTeamRosterSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamRosterFailure(error)));
  };
}
