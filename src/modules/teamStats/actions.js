import { handleErrors, handleSuccess } from "../../utils/helpers";

export const FETCH_TEAM_STATS_BEGIN = "FETCH_TEAM_STATS_BEGIN";
export const FETCH_TEAM_STATS_SUCCESS = "FETCH_TEAM_STATS_SUCCESS";
export const FETCH_TEAM_STATS_FAILURE = "FETCH_TEAM_STATS_FAILURE";

export const fetchTeamStatsBegin = () => ({
  type: FETCH_TEAM_STATS_BEGIN,
});

export const fetchTeamStatsSuccess = teamStatsData => ({
  type: FETCH_TEAM_STATS_SUCCESS,
  teamStatsData,
});

export const fetchTeamStatsFailure = teamStatsError => ({
  type: FETCH_TEAM_STATS_FAILURE,
  teamStatsError,
});

const getTeamStats = teamArg => {
  // TODO: Add When API is Live
  // function getTeamRoster(teamArg) {
  // return fetch(
  //   `https://api.fantasydata.net/v3/mlb/stats/JSON/PlayerSeasonStatsByTeam/{season}/${teamArg}`,
  //   ApiHeadersMLB
  // )
  return fetch(`${process.env.PUBLIC_URL}/data/teams/${teamArg}/playerstats.${teamArg}.json`)
    .then(handleErrors)
    .then(handleSuccess);
};

export const fetchTeamStats = teamArg => {
  return dispatch => {
    dispatch(fetchTeamStatsBegin());
    return getTeamStats(teamArg)
      .then(data => {
        dispatch(fetchTeamStatsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamStatsFailure(error)));
  };
};
