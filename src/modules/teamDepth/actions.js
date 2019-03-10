/* eslint-disable eqeqeq */
import { handleErrors } from "../../utils/helpers";

export const FETCH_TEAM_DEPTHS_BEGIN = "FETCH_TEAM_DEPTHS_BEGIN";
export const FETCH_TEAM_DEPTHS_SUCCESS = "FETCH_TEAM_DEPTHS_SUCCESS";
export const FETCH_TEAM_DEPTHS_FAILURE = "FETCH_TEAM_DEPTHS_FAILURE";

export const fetchTeamDepthsBegin = () => ({
  type: FETCH_TEAM_DEPTHS_BEGIN,
});

export const fetchTeamDepthsSuccess = teamDepths => ({
  type: FETCH_TEAM_DEPTHS_SUCCESS,
  payload: { teamDepths },
});

export const fetchTeamDepthsFailure = teamDepthsFail => ({
  type: FETCH_TEAM_DEPTHS_FAILURE,
  payload: { teamDepthsFail },
});

function getTeamDepths(teamAbrv) {
  const currentTeamAbrv = teamAbrv === "CHW" ? "CWS" : teamAbrv;
  return fetch("/data/all-teams-depth.json")
    .then(handleErrors)
    .then(res => res.json())
    .then(allTeams =>
      allTeams.teams.find(team => team.abbr == currentTeamAbrv)
    );
}

export function fetchTeamDepths(teamAbrv) {
  return dispatch => {
    dispatch(fetchTeamDepthsBegin());
    return getTeamDepths(teamAbrv)
      .then(data => {
        dispatch(fetchTeamDepthsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamDepthsFailure(error)));
  };
}
