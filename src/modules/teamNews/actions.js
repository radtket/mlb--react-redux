import { handleErrors, teamFinder } from "../../utils/helpers";

const { parseString } = require("xml2js");

export const FETCH_TEAM_NEWS_BEGIN = "FETCH_TEAM_NEWS_BEGIN";
export const FETCH_TEAM_NEWS_SUCCESS = "FETCH_TEAM_NEWS_SUCCESS";
export const FETCH_TEAM_NEWS_FAILURE = "FETCH_TEAM_NEWS_FAILURE";

export const fetchTeamNewsBegin = () => ({
  type: FETCH_TEAM_NEWS_BEGIN,
});

export const fetchTeamNewsSuccess = teamNews => ({
  type: FETCH_TEAM_NEWS_SUCCESS,
  payload: { teamNews },
});

export const fetchTeamNewsFailure = teamNewsFail => ({
  type: FETCH_TEAM_NEWS_FAILURE,
  payload: { teamNewsFail },
});

function getTeamNews(teamAbrv) {
  const { Name } = teamFinder(teamAbrv);
  const TeamName = Name.toLocaleLowerCase();

  return fetch(
    `${
      process.env.REACT_APP_CORS
    }https://www.mlb.com/${TeamName}/feeds/news/rss.xml`
  )
    .then(handleErrors)
    .then(response => {
      return response.text();
    });
}

export function fetchTeamNews(teamAbrv) {
  return dispatch => {
    dispatch(fetchTeamNewsBegin());
    return getTeamNews(teamAbrv)
      .then(data => {
        return parseString(data, (err, result) => {
          const { item } = result.rss.channel[0];
          dispatch(fetchTeamNewsSuccess(item));
          return item;
        });
      })
      .catch(error => dispatch(fetchTeamNewsFailure(error)));
  };
}
