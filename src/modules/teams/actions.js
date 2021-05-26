import { handleErrors, handleSuccess } from "../../utils/helpers";
// TODO: Add When API is Live
// import ApiHeadersMLB from "../../utils/api";

export const FETCH_TEAMS_BEGIN = "FETCH_TEAMS_BEGIN";
export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS";
export const FETCH_TEAMS_FAILURE = "FETCH_TEAMS_FAILURE";

export const fetchTeamsBegin = () => ({
  type: FETCH_TEAMS_BEGIN,
});

export const fetchTeamsSuccess = teams => {
  return {
    type: FETCH_TEAMS_SUCCESS,
    teams,
  };
};

export const fetchTeamsFailure = teamsError => ({
  type: FETCH_TEAMS_FAILURE,
  teamsError,
});

const getTeams = () => {
  // TODO: Add When API is Live
  // return (
  //   fetch(
  //     `https://api.fantasydata.net/v3/mlb/stats/JSON/teams`,
  //     ApiHeadersMLB
  //   )
  return fetch("/data/teams-with-stadiums.json")
    .then(handleErrors)
    .then(handleSuccess);
};

export const fetchTeams = () => dispatch => {
  dispatch(fetchTeamsBegin());
  return getTeams()
    .then(data => {
      dispatch(fetchTeamsSuccess(data));
      return data;
    })
    .catch(error => dispatch(fetchTeamsFailure(error)));
};
