import {
  handleErrors,
  handleSuccess,
  formatApiArgDatedate,
} from "../../utils/helpers";

export const FETCH_GAMES_ON_DAY_BEGIN = "FETCH_GAMES_ON_DAY_BEGIN";
export const FETCH_GAMES_ON_DAY_SUCCESS = "FETCH_GAMES_ON_DAY_SUCCESS";
export const FETCH_GAMES_ON_DAY_FAILURE = "FETCH_GAMES_ON_DAY_FAILURE";

export const fetchGamesOnDayBegin = () => ({
  type: FETCH_GAMES_ON_DAY_BEGIN,
});

export const fetchGamesOnDaySuccess = gamesOnDayData => ({
  type: FETCH_GAMES_ON_DAY_SUCCESS,
  gamesOnDayData,
});

export const fetchGamesOnDayFailure = gamesOnDayError => ({
  type: FETCH_GAMES_ON_DAY_FAILURE,
  gamesOnDayError,
});

const getGamesOnDay = dateArg => {
  const date = formatApiArgDatedate(dateArg);
  return (
    // TODO: Add When API is Live
    // fetch(
    //   `https://api.fantasydata.net/v3/mlb/stats/JSON/GamesByDate/{date}`,
    //   ApiHeadersMLB
    // )
    fetch(`${process.env.PUBLIC_URL}/data/GamesByDate/${date}.json`)
      .then(handleErrors)
      .then(handleSuccess)
  );
};

export const fetchGamesOnDay = dateArg => {
  return dispatch => {
    dispatch(fetchGamesOnDayBegin());
    return getGamesOnDay(dateArg)
      .then(data => {
        dispatch(fetchGamesOnDaySuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchGamesOnDayFailure(error)));
  };
};
