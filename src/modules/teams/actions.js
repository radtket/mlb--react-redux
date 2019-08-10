import { handleErrors } from "../../utils/helpers";
// TODO: Add When API is Live
// import { ApiHeadersMLB } from "../../utils/api";

export const FETCH_TEAMS_BEGIN = "FETCH_TEAMS_BEGIN";
export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS";
export const FETCH_TEAMS_FAILURE = "FETCH_TEAMS_FAILURE";

const fetchTeamsBegin = () => ({
  type: FETCH_TEAMS_BEGIN,
});

const fetchTeamsSuccess = teams => ({
  type: FETCH_TEAMS_SUCCESS,
  payload: { teams },
});

const fetchTeamsFailure = teamsFail => ({
  type: FETCH_TEAMS_FAILURE,
  payload: { teamsFail },
});

function getTeams() {
  // TODO: Add When API is Live
  return Promise.all([
    fetch(`/data/mlb/teams-with-stadiums.json`)
      .then(handleErrors)
      .then(value => value.json()),
    fetch(`/data/nba/teams--nba.json`)
      .then(handleErrors)
      .then(value => value.json()),
  ]);
}

export function fetchTeams() {
  return dispatch => {
    dispatch(fetchTeamsBegin());
    return getTeams()
      .then(data => {
        const [MLB, NBA] = data;
        return { MLB, NBA };
      })
      .then(res => {
        dispatch(fetchTeamsSuccess(res));
        return res;
      })
      .catch(error => dispatch(fetchTeamsFailure(error)));
  };
}
