import { handleErrors, handleSuccess } from "../../utils/helpers";

export const FETCH_LEAGUE_LEADERS_BEGIN = "FETCH_LEAGUE_LEADERS_BEGIN";
export const FETCH_LEAGUE_LEADERS_SUCCESS = "FETCH_LEAGUE_LEADERS_SUCCESS";
export const FETCH_LEAGUE_LEADERS_FAILURE = "FETCH_LEAGUE_LEADERS_FAILURE";

export const fetchLeagueLeadersBegin = () => ({
  type: FETCH_LEAGUE_LEADERS_BEGIN,
});

export const fetchLeagueLeadersSuccess = leagueLeadersData => ({
  type: FETCH_LEAGUE_LEADERS_SUCCESS,
  leagueLeadersData,
});

export const fetchLeagueLeadersFailure = leagueLeadersError => ({
  type: FETCH_LEAGUE_LEADERS_FAILURE,
  leagueLeadersError,
});

const getLeagueLeaders = (seasonYear = 2019, mlbSeason = "REG") => {
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
      .then(handleSuccess)
      .then(({ leagues }) => {
        return leagues.reduce(
          (all, { pitching, hitting, alias }) => {
            return {
              ...all,
              [alias]: Object.entries({ pitching, hitting }).reduce(
                (teamsAndPlayers, [pitchorhitKey, pitchorhitData]) =>
                  Object.entries(pitchorhitData).reduce(
                    (obj, [statKey, statData]) => {
                      return Object.entries(statData).reduce(
                        (zzz, [teamsorplayersKey, teamsorplayersData]) => {
                          zzz[teamsorplayersKey][pitchorhitKey][
                            statKey
                          ] = teamsorplayersData;

                          return zzz;
                        },
                        obj
                      );
                    },
                    teamsAndPlayers
                  ),
                {
                  teams: {
                    pitching: {},
                    hitting: {},
                  },
                  players: {
                    pitching: {},
                    hitting: {},
                  },
                }
              ),
            };
          },
          { AL: {}, NL: {}, MLB: {} }
        );
      })
  );
};

export const fetchLeagueLeaders = () => {
  return dispatch => {
    dispatch(fetchLeagueLeadersBegin());
    return getLeagueLeaders()
      .then(({ MLB }) => {
        const { teams } = MLB;
        dispatch(fetchLeagueLeadersSuccess(teams));
        return teams;
      })
      .catch(error => dispatch(fetchLeagueLeadersFailure(error)));
  };
};
