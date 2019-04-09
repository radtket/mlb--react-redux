import { handleErrors, teamFinder } from "../../utils/helpers";

export const FETCH_NEWS_TEAMS_BEGIN = "FETCH_NEWS_TEAMS_BEGIN";
export const FETCH_NEWS_TEAMS_SUCCESS = "FETCH_NEWS_TEAMS_SUCCESS";
export const FETCH_NEWS_TEAMS_FAILURE = "FETCH_NEWS_TEAMS_FAILURE";

export const fetchNewsTeamsBegin = () => ({
  type: FETCH_NEWS_TEAMS_BEGIN,
});

export const fetchNewsTeamsSuccess = newsTeams => ({
  type: FETCH_NEWS_TEAMS_SUCCESS,
  payload: { newsTeams },
});

export const fetchNewsTeamsFailure = newsTeamsFail => ({
  type: FETCH_NEWS_TEAMS_FAILURE,
  payload: { newsTeamsFail },
});

function getNewsTeams(teamName) {
  return fetch(
    `https://newsapi.org/v2/everything?q=mlb+${teamName}&?sources=espn&apiKey=${
      process.env.REACT_APP_NEWS_API_KEY
    }`
  )
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchNewsTeams(teamName) {
  const { Name } = teamFinder[teamName];
  return dispatch => {
    dispatch(fetchNewsTeamsBegin());
    return getNewsTeams(Name.toLowerCase())
      .then(data => {
        dispatch(fetchNewsTeamsSuccess(data.articles));
        return data.articles;
      })
      .catch(error => dispatch(fetchNewsTeamsFailure(error)));
  };
}
