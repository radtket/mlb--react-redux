import { handleErrors, teamFinder } from "../../utils/helpers";

const { parseString } = require("xml2js");

export const FETCH_TEAM_RSS_NEWS_BEGIN = "FETCH_TEAM_RSS_NEWS_BEGIN";
export const FETCH_TEAM_RSS_NEWS_SUCCESS = "FETCH_TEAM_RSS_NEWS_SUCCESS";
export const FETCH_TEAM_RSS_NEWS_FAILURE = "FETCH_TEAM_RSS_NEWS_FAILURE";

export const fetchTeamRssNewsBegin = () => ({
  type: FETCH_TEAM_RSS_NEWS_BEGIN,
});

export const fetchTeamRssNewsSuccess = teamRssNewsData => ({
  type: FETCH_TEAM_RSS_NEWS_SUCCESS,
  teamRssNewsData,
});

export const fetchTeamRssNewsFailure = teamRssNewsError => ({
  type: FETCH_TEAM_RSS_NEWS_FAILURE,
  teamRssNewsError,
});

const getTeamRssNews = teamAbrv => {
  const { Name } = teamFinder[teamAbrv];
  const TeamName = Name.toLocaleLowerCase();

  return fetch(
    `${process.env.REACT_APP_CORS}https://www.mlb.com/${TeamName.replace(
      / /g,
      ""
    )}/feeds/news/rss.xml`
  )
    .then(handleErrors)
    .then(response => {
      return response.text();
    });
};

export const fetchTeamRssNews = teamAbrv => {
  return dispatch => {
    dispatch(fetchTeamRssNewsBegin());
    return getTeamRssNews(teamAbrv)
      .then(data => {
        return parseString(data, (err, result) => {
          const { item } = result.rss.channel[0];
          dispatch(fetchTeamRssNewsSuccess(item));
          return item;
        });
      })
      .catch(error => dispatch(fetchTeamRssNewsFailure(error)));
  };
};
