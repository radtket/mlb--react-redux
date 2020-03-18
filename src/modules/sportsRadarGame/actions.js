import { handleErrors, smallestToLargest } from "../../utils/helpers";

export const FETCH_SPORTS_RADAR_GAMES_BEGIN = "FETCH_SPORTS_RADAR_GAMES_BEGIN";
export const FETCH_SPORTS_RADAR_GAMES_SUCCESS =
  "FETCH_SPORTS_RADAR_GAMES_SUCCESS";
export const FETCH_SPORTS_RADAR_GAMES_FAILURE =
  "FETCH_SPORTS_RADAR_GAMES_FAILURE";

export const fetchSportsRadarGamesBegin = () => ({
  type: FETCH_SPORTS_RADAR_GAMES_BEGIN,
});

export const fetchSportsRadarGamesSuccess = sportsRadarGamesData => ({
  type: FETCH_SPORTS_RADAR_GAMES_SUCCESS,
  sportsRadarGamesData,
});

export const fetchSportsRadarGamesFailure = sportsRadarGamesError => ({
  type: FETCH_SPORTS_RADAR_GAMES_FAILURE,
  sportsRadarGamesError,
});

const getSportsRadarGames = () => {
  return fetch("/data/games-sports-radar.json")
    .then(handleErrors)
    .then(res => res.json())
    .then(data => {
      return data.games.sort(smallestToLargest("scheduled"));
    });
};

export const fetchSportsRadarGames = () => {
  return dispatch => {
    dispatch(fetchSportsRadarGamesBegin());
    return getSportsRadarGames()
      .then(data => {
        dispatch(fetchSportsRadarGamesSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchSportsRadarGamesFailure(error)));
  };
};
