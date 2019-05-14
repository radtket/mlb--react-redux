import { handleErrors } from "../../utils/helpers";
// TODO: Add When API is Live
// import ApiHeadersMLB from "../../utils/api";

export const FETCH_TEAM_ROSTER_BEGIN = "FETCH_TEAM_ROSTER_BEGIN";
export const FETCH_TEAM_ROSTER_SUCCESS = "FETCH_TEAM_ROSTER_SUCCESS";
export const FETCH_TEAM_ROSTER_FAILURE = "FETCH_TEAM_ROSTER_FAILURE";

export const fetchTeamRosterBegin = () => ({
  type: FETCH_TEAM_ROSTER_BEGIN,
});

export const fetchTeamRosterSuccess = teamRoster => ({
  type: FETCH_TEAM_ROSTER_SUCCESS,
  payload: { teamRoster },
});

export const fetchTeamRosterFailure = error => ({
  type: FETCH_TEAM_ROSTER_FAILURE,
  payload: { error },
});

function getTeamRoster(teamArg) {
  // TODO: Add When API is Live
  // function getTeamRoster(teamArg) {
  // return fetch(
  //   `https://api.fantasydata.net/v3/mlb/scores/JSON/Players/${teamArg}`,
  //   ApiHeadersMLB
  // )
  return fetch(`/data/mlb/teams/${teamArg}/roster.${teamArg}.json`)
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchTeamRoster(teamArg) {
  return dispatch => {
    dispatch(fetchTeamRosterBegin());
    return getTeamRoster(teamArg)
      .then(data => {
        dispatch(fetchTeamRosterSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamRosterFailure(error)));
  };
}
