import { handleErrors, formatApiArgDatedate } from "../../utils/helpers";
// TODO: Add When API is Live
// import ApiHeadersMLB from "../../utils/api";

export const FETCH_NEWS_ALL_TEAMS_BEGIN = "FETCH_NEWS_ALL_TEAMS_BEGIN";
export const FETCH_NEWS_ALL_TEAMS_SUCCESS = "FETCH_NEWS_ALL_TEAMS_SUCCESS";
export const FETCH_NEWS_ALL_TEAMS_FAILURE = "FETCH_NEWS_ALL_TEAMS_FAILURE";

export const fetchNewsAllTeamsBegin = () => ({
  type: FETCH_NEWS_ALL_TEAMS_BEGIN,
});

export const fetchNewsAllTeamsSuccess = newsAllTeams => ({
  type: FETCH_NEWS_ALL_TEAMS_SUCCESS,
  payload: { newsAllTeams },
});

export const fetchNewsAllTeamsFailure = error => ({
  type: FETCH_NEWS_ALL_TEAMS_FAILURE,
  payload: { error },
});

function getNewsAllTeams(dateArg) {
  const date = formatApiArgDatedate(dateArg);
  return (
    // TODO: Add When API is Live
    // fetch(
    //   `https://api.fantasydata.net/v3/mlb/stats/JSON/NewsByDate/${date}`,
    //   ApiHeadersMLB
    // )
    fetch(`/data/news-${date}.json`)
      .then(handleErrors)
      .then(res => res.json())
  );
}

export function fetchNewsAllTeams(dateArg) {
  return dispatch => {
    dispatch(fetchNewsAllTeamsBegin());
    return getNewsAllTeams(dateArg)
      .then(data => {
        dispatch(fetchNewsAllTeamsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchNewsAllTeamsFailure(error)));
  };
}
