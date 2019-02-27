import { handleErrors } from "../../utils/helpers";

export const FETCH_PLAYER_BEGIN = "FETCH_PLAYER_BEGIN";
export const FETCH_PLAYER_SUCCESS = "FETCH_PLAYER_SUCCESS";
export const FETCH_PLAYER_FAILURE = "FETCH_PLAYER_FAILURE";

export const fetchPlayerBegin = () => ({
  type: FETCH_PLAYER_BEGIN,
});

export const fetchPlayerSuccess = player => ({
  type: FETCH_PLAYER_SUCCESS,
  payload: { player },
});

export const fetchPlayerFailure = playerFail => ({
  type: FETCH_PLAYER_FAILURE,
  payload: { playerFail },
});

function getPlayer(playerArg) {
  // TODO: Add When API is Live
  // function getTeamRoster(playerArg) {
  // return fetch(
  //   `https://api.fantasydata.net/v3/mlb/stats/json/PlayerSeasonStatsByPlayer/${season}/${playerid}`,
  //   apiHeaders
  // )
  return fetch(`/data/players/PlayerSeasonStatsByPlayer.${playerArg}.json`)
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchPlayer(playerArg) {
  return dispatch => {
    dispatch(fetchPlayerBegin());
    return getPlayer(playerArg)
      .then(data => {
        dispatch(fetchPlayerSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchPlayerFailure(error)));
  };
}
