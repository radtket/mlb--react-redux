import { handleErrors, formatApiArgDatedate } from "../../utils/helpers";

export const FETCH_GAMES_ON_DAY_BEGIN = "FETCH_GAMES_ON_DAY_BEGIN";
export const FETCH_GAMES_ON_DAY_SUCCESS = "FETCH_GAMES_ON_DAY_SUCCESS";
export const FETCH_GAMES_ON_DAY_FAILURE = "FETCH_GAMES_ON_DAY_FAILURE";

export const fetchGamesOnDayBegin = () => ({
  type: FETCH_GAMES_ON_DAY_BEGIN,
});

export const fetchGamesOnDaySuccess = gamesOnDay => ({
  type: FETCH_GAMES_ON_DAY_SUCCESS,
  payload: { gamesOnDay },
});

export const fetchGamesOnDayFailure = gamesOnDayFail => ({
  type: FETCH_GAMES_ON_DAY_FAILURE,
  payload: { gamesOnDayFail },
});

function getGamesOnDay(dateArg) {
  const date = formatApiArgDatedate(dateArg);
  // TODO: Add When API is Live
  // return fetch(
  //   `https://api.fantasydata.net/v3/mlb/scores/JSON/Players/${date}`,
  //   apiHeaders
  // )
  return fetch(`/data/GamesByDate/${date}.json`)
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchGamesOnDay(dateArg) {
  return dispatch => {
    dispatch(fetchGamesOnDayBegin());
    return getGamesOnDay(dateArg)
      .then(data => {
        dispatch(fetchGamesOnDaySuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchGamesOnDayFailure(error)));
  };
}
