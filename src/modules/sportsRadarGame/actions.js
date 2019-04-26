import { handleErrors, smallestToLargest } from "../../utils/helpers";

export const FETCH_SPORTS_RADAR_GAMES_BEGIN = "FETCH_SPORTS_RADAR_GAMES_BEGIN";
export const FETCH_SPORTS_RADAR_GAMES_SUCCESS =
  "FETCH_SPORTS_RADAR_GAMES_SUCCESS";
export const FETCH_SPORTS_RADAR_GAMES_FAILURE =
  "FETCH_SPORTS_RADAR_GAMES_FAILURE";

export const fetchSportsRadarGamesBegin = () => ({
  type: FETCH_SPORTS_RADAR_GAMES_BEGIN,
});

export const fetchSportsRadarGamesSuccess = sportsRadarGames => ({
  type: FETCH_SPORTS_RADAR_GAMES_SUCCESS,
  payload: { sportsRadarGames },
});

export const fetchSportsRadarGamesFailure = sportsRadarGamesFail => ({
  type: FETCH_SPORTS_RADAR_GAMES_FAILURE,
  payload: { sportsRadarGamesFail },
});

function getSportsRadarGames() {
  return fetch("/data/games-sports-radar.json")
    .then(handleErrors)
    .then(res => res.json())
    .then(data => {
      return data.games.sort(smallestToLargest("scheduled"));
    });
}

export function fetchSportsRadarGames() {
  return dispatch => {
    dispatch(fetchSportsRadarGamesBegin());
    return getSportsRadarGames()
      .then(data => {
        dispatch(fetchSportsRadarGamesSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchSportsRadarGamesFailure(error)));
  };
}
