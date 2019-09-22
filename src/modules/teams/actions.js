import { handleErrors } from "../../utils/helpers";
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
    payload: { teams },
  };
};

export const fetchTeamsFailure = teamsFail => ({
  type: FETCH_TEAMS_FAILURE,
  payload: { teamsFail },
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
    .then(res => res.json());
};

export const fetchTeams = () => {
  return dispatch => {
    console.log({ dispatch });
    dispatch(fetchTeamsBegin());
    return getTeams()
      .then(data => {
        dispatch(fetchTeamsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamsFailure(error)));
  };
};
