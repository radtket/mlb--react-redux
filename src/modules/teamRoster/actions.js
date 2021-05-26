import { handleErrors, handleSuccess } from "../../utils/helpers";
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
  teamRoster,
});

export const fetchTeamRosterFailure = teamRosterError => ({
  type: FETCH_TEAM_ROSTER_FAILURE,
  teamRosterError,
});

const getTeamRoster = teamArg => {
  // TODO: Add When API is Live
  // return fetch(
  //   `https://api.fantasydata.net/v3/mlb/scores/JSON/Players/${teamArg}`,
  //   ApiHeadersMLB
  // )
  return fetch(`/data/teams/${teamArg}/roster.${teamArg}.json`)
    .then(handleErrors)
    .then(handleSuccess);
};

export const fetchTeamRoster = teamArg => {
  return dispatch => {
    dispatch(fetchTeamRosterBegin());
    return getTeamRoster(teamArg)
      .then(data => {
        dispatch(fetchTeamRosterSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamRosterFailure(error)));
  };
};
