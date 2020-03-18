import { handleErrors, teamFinder } from "../../utils/helpers";

export const FETCH_NEWS_TEAMS_BEGIN = "FETCH_NEWS_TEAMS_BEGIN";
export const FETCH_NEWS_TEAMS_SUCCESS = "FETCH_NEWS_TEAMS_SUCCESS";
export const FETCH_NEWS_TEAMS_FAILURE = "FETCH_NEWS_TEAMS_FAILURE";

export const fetchNewsTeamsBegin = () => ({
  type: FETCH_NEWS_TEAMS_BEGIN,
});

export const fetchNewsTeamsSuccess = newsTeamsData => ({
  type: FETCH_NEWS_TEAMS_SUCCESS,
  newsTeamsData,
});

export const fetchNewsTeamsFailure = newsTeamsError => ({
  type: FETCH_NEWS_TEAMS_FAILURE,
  newsTeamsError,
});

const getNewsTeams = teamName => {
  return fetch(
    `https://newsapi.org/v2/everything?q=mlb+${teamName}&?sources=espn&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  )
    .then(handleErrors)
    .then(res => res.json());
};

export const fetchNewsTeams = teamName => {
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
};
