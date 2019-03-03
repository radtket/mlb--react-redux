import { handleErrors } from "../../utils/helpers";

export const FETCH_TEAM_STATS_BEGIN = "FETCH_TEAM_STATS_BEGIN";
export const FETCH_TEAM_STATS_SUCCESS = "FETCH_TEAM_STATS_SUCCESS";
export const FETCH_TEAM_STATS_FAILURE = "FETCH_TEAM_STATS_FAILURE";

export const fetchTeamStatsBegin = () => ({
  type: FETCH_TEAM_STATS_BEGIN,
});

export const fetchTeamStatsSuccess = teamStats => ({
  type: FETCH_TEAM_STATS_SUCCESS,
  payload: { teamStats },
});

export const fetchTeamStatsFailure = teamStatsFail => ({
  type: FETCH_TEAM_STATS_FAILURE,
  payload: { teamStatsFail },
});

function getTeamStats(teamArg) {
  // TODO: Add When API is Live
  // function getTeamRoster(teamArg) {
  // return fetch(
  //   `https://api.fantasydata.net/v3/mlb/stats/{format}/PlayerSeasonStatsByTeam/{season}/${teamArg}`,
  //   apiHeaders
  // )
  return fetch(`/data/teams/${teamArg}/playerstats.${teamArg}.json`)
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchTeamStats(teamArg) {
  return dispatch => {
    dispatch(fetchTeamStatsBegin());
    return getTeamStats(teamArg)
      .then(data => {
        dispatch(fetchTeamStatsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamStatsFailure(error)));
  };
}
