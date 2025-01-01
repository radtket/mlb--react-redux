import {
  handleErrors,
  handleSuccess,
  // SportsRadarID
} from "../../utils/helpers";

export const FETCH_TEAM_SPLITS_BEGIN = "FETCH_TEAM_SPLITS_BEGIN";
export const FETCH_TEAM_SPLITS_SUCCESS = "FETCH_TEAM_SPLITS_SUCCESS";
export const FETCH_TEAM_SPLITS_FAILURE = "FETCH_TEAM_SPLITS_FAILURE";

export const fetchTeamSplitsBegin = () => ({
  type: FETCH_TEAM_SPLITS_BEGIN,
});

export const fetchTeamSplitsSuccess = teamSplitsData => ({
  type: FETCH_TEAM_SPLITS_SUCCESS,
  teamSplitsData,
});

export const fetchTeamSplitsFailure = teamSplitsError => ({
  type: FETCH_TEAM_SPLITS_FAILURE,
  teamSplitsError,
});

const getTeamSplits = teamArg => {
  // const teamId = SportsRadarID[teamArg];
  return (
    // TODO: Add When API is Live
    // fetch(
    //   `${
    //     process.env.REACT_APP_CORS
    //   }https://api.sportradar.us/mlb-t6/seasontd/2019/REG/teams/${teamId}/splits.json?api_key=${
    //     process.env.REACT_APP_SPORTSRADAR_MLB_API_KEY
    //   }`
    // )
    fetch(`${process.env.PUBLIC_URL}/data/teams/${teamArg}/splits.json`)
      .then(handleErrors)
      .then(handleSuccess)
      .then(data => {
        const { hitting: hittingWrap, pitching: pitchingWrap } = data.splits;
        const [pitching] = pitchingWrap.overall;
        const [hitting] = hittingWrap.overall;
        return {
          hitting,
          pitching,
        };
      })
  );
};

export const fetchTeamSplits = teamArg => {
  return dispatch => {
    dispatch(fetchTeamSplitsBegin());
    return getTeamSplits(teamArg)
      .then(data => {
        dispatch(fetchTeamSplitsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchTeamSplitsFailure(error)));
  };
};
