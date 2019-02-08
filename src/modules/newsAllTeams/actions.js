export const FETCH_NEWS_ALL_TEAMS_BEGIN = "FETCH_NEWS_ALL_TEAMS_BEGIN";
export const FETCH_NEWS_ALL_TEAMS_SUCCESS = "FETCH_NEWS_ALL_TEAMS_SUCCESS";
export const FETCH_NEWS_ALL_TEAMS_FAILURE = "FETCH_NEWS_ALL_TEAMS_FAILURE";

export const fetchNewsAllTeamsBegin = () => ({
  type: FETCH_NEWS_ALL_TEAMS_BEGIN
});

export const fetchNewsAllTeamsSuccess = newsAllTeams => ({
  type: FETCH_NEWS_ALL_TEAMS_SUCCESS,
  payload: { newsAllTeams }
});

export const fetchNewsAllTeamsFailure = error => ({
  type: FETCH_NEWS_ALL_TEAMS_FAILURE,
  payload: { error }
});

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function getNewsAllTeams() {
  return fetch("/data/news.json")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchNewsAllTeams() {
  return dispatch => {
    dispatch(fetchNewsAllTeamsBegin());
    return getNewsAllTeams()
      .then(data => {
        dispatch(fetchNewsAllTeamsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchNewsAllTeamsFailure(error)));
  };
}
