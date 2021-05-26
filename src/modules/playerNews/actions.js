import { handleErrors, handleSuccess } from "../../utils/helpers";
// TODO: Add When API is Live
// import ApiHeadersMLB from "../../utils/api";

export const FETCH_PLAYER_NEWS_BEGIN = "FETCH_PLAYER_NEWS_BEGIN";
export const FETCH_PLAYER_NEWS_SUCCESS = "FETCH_PLAYER_NEWS_SUCCESS";
export const FETCH_PLAYER_NEWS_FAILURE = "FETCH_PLAYER_NEWS_FAILURE";

export const fetchPlayerNewsBegin = () => ({
  type: FETCH_PLAYER_NEWS_BEGIN,
});

export const fetchPlayerNewsSuccess = playerNews => {
  console.log({ playerNews });
  return {
    type: FETCH_PLAYER_NEWS_SUCCESS,
    payload: { playerNews },
  };
};

export const fetchPlayerNewsFailure = playerNewsFail => ({
  type: FETCH_PLAYER_NEWS_FAILURE,
  payload: { playerNewsFail },
});

const getPlayerNews = playerId => {
  return (
    // TODO: Add When API is Live
    // fetch(
    //   `https://api.fantasydata.net/v3/mlb/stats/JSON/NewsByPlayerID/${playerId}`,
    //   ApiHeadersMLB
    // )
    fetch(`/data/PlayerNewsByID-${playerId}.json`)
      .then(handleErrors)
      .then(handleSuccess)
  );
};

export const fetchPlayerNews = playerId => {
  return dispatch => {
    dispatch(fetchPlayerNewsBegin());
    return getPlayerNews(playerId)
      .then(data => {
        dispatch(fetchPlayerNewsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchPlayerNewsFailure(error)));
  };
};
