import { handleErrors, handleSuccess } from "../../utils/helpers";

export const FETCH_PLAYER_STATS_BEGIN = "FETCH_PLAYER_STATS_BEGIN";
export const FETCH_PLAYER_STATS_SUCCESS = "FETCH_PLAYER_STATS_SUCCESS";
export const FETCH_PLAYER_STATS_FAILURE = "FETCH_PLAYER_STATS_FAILURE";

export const fetchPlayerStatsBegin = () => ({
  type: FETCH_PLAYER_STATS_BEGIN,
});

export const fetchPlayerStatsSuccess = playerStatsData => ({
  type: FETCH_PLAYER_STATS_SUCCESS,
  playerStatsData,
});

export const fetchPlayerStatsFailure = playerStatsError => ({
  type: FETCH_PLAYER_STATS_FAILURE,
  playerStatsError,
});

const getPlayerStats = (playerId, PositionCategory) => {
  const isPitcher = PositionCategory === "P";
  const PosCat = isPitcher ? "pitching" : "batting";
  return fetch(
    `${process.env.REACT_APP_CORS}https://www.rotowire.com/baseball/ajax/player-page-data.php?id=${playerId}&stats=${PosCat}`,
    {
      credentials: "omit",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: `${process.env.REACT_APP_CORS}https://www.rotowire.com/baseball/player.php?id=${playerId}`,
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "GET",
      mode: "cors",
    }
  )
    .then(handleErrors)
    .then(handleSuccess)
    .then(statType =>
      Object.entries(statType).reduce(
        (all, single) => {
          const [statCategory, stats] = single;
          const AllStats = all;
          if (statCategory === "basic" || statCategory === "advanced") {
            AllStats[statCategory] = { ...stats[PosCat] };
          }
          if (statCategory === "gamelog") {
            AllStats[statCategory] = { ...stats };
          }
          if (statCategory === "gamesByPos" || statCategory === "defensive") {
            AllStats[statCategory] = stats;
          }
          return all;
        },
        { isPitcher, playerId }
      )
    );
};

export const fetchPlayerStats = (playerId, PositionCategory) => {
  return dispatch => {
    dispatch(fetchPlayerStatsBegin());
    return getPlayerStats(playerId, PositionCategory)
      .then(data => {
        // const { basic } = data;
        // dispatch(fetchPlayerStatsSuccess(basic.body));
        // return basic.body;
        dispatch(fetchPlayerStatsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchPlayerStatsFailure(error)));
  };
};
