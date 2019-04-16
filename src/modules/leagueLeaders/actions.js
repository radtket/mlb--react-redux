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

const buildCatObject = (all, one, name, cat) => {
  return Object.entries(one).forEach(item => {
    const [statKey, statValues] = item;
    const { players, teams } = statValues;
    const allStats = all;
    allStats[name].teams[`${cat}`][statKey] =
      allStats[name].teams[`${cat}`][statKey] || {};
    allStats[name].teams[`${cat}`][statKey] = teams;

    allStats[name].players[`${cat}`][statKey] =
      allStats[name].players[`${cat}`][statKey] || {};
    allStats[name].players[`${cat}`][statKey] = players;
  });
};

export function fetchLeagueLeaders() {
  return dispatch => {
    dispatch(fetchLeagueLeadersBegin());
    return getLeagueLeaders()
      .then(data => {
        return data.leagues.reduce((all, one) => {
          const {
            pitching: pitchingData,
            hitting: hittingData,
            alias: key,
          } = one;

          const allStats = all;
          allStats[key] = allStats[key] || {};
          allStats[key].teams = allStats[key].teams || {};
          allStats[key].players = allStats[key].players || {};

          allStats[key].teams.pitching = allStats[key].teams.pitching || {};
          allStats[key].players.pitching = allStats[key].players.pitching || {};

          allStats[key].teams.hitting = allStats[key].teams.hitting || {};
          allStats[key].players.hitting = allStats[key].players.hitting || {};

          buildCatObject(allStats, pitchingData, key, "pitching");
          buildCatObject(allStats, hittingData, key, "hitting");

          // console.log(all);

          return all;
        }, {});
      })
      .then(allData => {
        const { MLB } = allData;
        dispatch(fetchLeagueLeadersSuccess(MLB.teams));
        return MLB.teams;
      })
      .catch(error => dispatch(fetchLeagueLeadersFailure(error)));
  };
}
