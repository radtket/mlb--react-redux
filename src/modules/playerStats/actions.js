import { handleErrors } from "../../utils/helpers";

export const FETCH_PLAYER_STATS_BEGIN = "FETCH_PLAYER_STATS_BEGIN";
export const FETCH_PLAYER_STATS_SUCCESS = "FETCH_PLAYER_STATS_SUCCESS";
export const FETCH_PLAYER_STATS_FAILURE = "FETCH_PLAYER_STATS_FAILURE";

export const fetchPlayerStatsBegin = () => ({
  type: FETCH_PLAYER_STATS_BEGIN,
});

export const fetchPlayerStatsSuccess = playerStats => ({
  type: FETCH_PLAYER_STATS_SUCCESS,
  payload: { playerStats },
});

export const fetchPlayerStatsFailure = playerStatsFail => ({
  type: FETCH_PLAYER_STATS_FAILURE,
  payload: { playerStatsFail },
});

function getPlayerStats(playerId, PositionCategory) {
  return fetch(
    `${
      process.env.REACT_APP_CORS
    }https://www.rotowire.com/baseball/ajax/player-page-data.php?id=${playerId}&stats=${
      PositionCategory === "P" ? "pitching" : "batting"
    }`,
    {
      credentials: "omit",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: `${
        process.env.REACT_APP_CORS
      }https://www.rotowire.com/baseball/player.php?id=${playerId}`,
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "GET",
      mode: "cors",
    }
  )
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchPlayerStats(playerId, playerName) {
  return dispatch => {
    dispatch(fetchPlayerStatsBegin());
    return getPlayerStats(playerId, playerName)
      .then(data => {
        dispatch(fetchPlayerStatsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchPlayerStatsFailure(error)));
  };
}
