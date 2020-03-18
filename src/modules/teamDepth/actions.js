import { handleErrors } from "../../utils/helpers";

export const FETCH_TEAM_DEPTHS_BEGIN = "FETCH_TEAM_DEPTHS_BEGIN";
export const FETCH_TEAM_DEPTHS_SUCCESS = "FETCH_TEAM_DEPTHS_SUCCESS";
export const FETCH_TEAM_DEPTHS_FAILURE = "FETCH_TEAM_DEPTHS_FAILURE";

export const fetchTeamDepthsBegin = () => ({
  type: FETCH_TEAM_DEPTHS_BEGIN,
});

export const fetchTeamDepthsSuccess = teamDepthsData => ({
  type: FETCH_TEAM_DEPTHS_SUCCESS,
  teamDepthsData,
});

export const fetchTeamDepthsFailure = teamDepthsError => ({
  type: FETCH_TEAM_DEPTHS_FAILURE,
  teamDepthsError,
});

const getTeamDepths = teamAbrv => {
  const currentTeamAbrv = teamAbrv === "CHW" ? "CWS" : teamAbrv;
  return (
    // TODO: Add When API is Live
    // fetch(
    //   `${
    //     process.env.REACT_APP_CORS
    //   }https://api.sportradar.us/mlb-t6/league/depth_charts.json?api_key=${
    //     process.env.REACT_APP_SPORTSRADAR_MLB_API_KEY
    //   }`
    // )
    fetch("/data/all-teams-depth.json")
      .then(handleErrors)
      .then(res => res.json())
      .then(({ teams }) =>
        teams.find(team => {
          return team.abbr === currentTeamAbrv;
        })
      )
  );
};

export const fetchTeamDepths = teamAbrv => {
  return dispatch => {
    dispatch(fetchTeamDepthsBegin());
    return getTeamDepths(teamAbrv)
      .then(data => {
        dispatch(fetchTeamDepthsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamDepthsFailure(error)));
  };
};
