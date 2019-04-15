import { handleErrors } from "../../utils/helpers";

export const FETCH_LEAGUE_LEADERS_BEGIN = "FETCH_LEAGUE_LEADERS_BEGIN";
export const FETCH_LEAGUE_LEADERS_SUCCESS = "FETCH_LEAGUE_LEADERS_SUCCESS";
export const FETCH_LEAGUE_LEADERS_FAILURE = "FETCH_LEAGUE_LEADERS_FAILURE";

export const fetchLeagueLeadersBegin = () => ({
  type: FETCH_LEAGUE_LEADERS_BEGIN,
});

export const fetchLeagueLeadersSuccess = leagueLeaders => ({
  type: FETCH_LEAGUE_LEADERS_SUCCESS,
  payload: { leagueLeaders },
});

export const fetchLeagueLeadersFailure = leagueLeadersFail => ({
  type: FETCH_LEAGUE_LEADERS_FAILURE,
  payload: { leagueLeadersFail },
});

function getLeagueLeaders(seasonYear = 2019, mlbSeason = "REG") {
  return (
    // TODO: Add When API is Live
    // fetch(
    //   `${
    //     process.env.REACT_APP_CORS
    //   }https://api.sportradar.us/mlb-t6/seasontd/${seasonYear}/${mlbSeason}/leaders/statistics.json?api_key=${
    //     process.env.REACT_APP_SPORTSRADAR_MLB_API_KEY
    //   }`
    // )
    fetch(`/data/stats-league-leaders-${seasonYear}-${mlbSeason}.json`)
      .then(handleErrors)
      .then(res => res.json())
  );
}

export function fetchLeagueLeaders() {
  return dispatch => {
    dispatch(fetchLeagueLeadersBegin());
    return getLeagueLeaders()
      .then(data => {
        dispatch(fetchLeagueLeadersSuccess(data.leagues));
        return data.leagues;
      })
      .catch(error => dispatch(fetchLeagueLeadersFailure(error)));
  };
}
