import { handleErrors } from "../../utils/helpers";

export const FETCH_ALL_PLAYERS_BEGIN = "FETCH_ALL_PLAYERS_BEGIN";
export const FETCH_ALL_PLAYERS_SUCCESS = "FETCH_ALL_PLAYERS_SUCCESS";
export const FETCH_ALL_PLAYERS_FAILURE = "FETCH_ALL_PLAYERS_FAILURE";

export const fetchAllPlayersBegin = () => ({
  type: FETCH_ALL_PLAYERS_BEGIN,
});

export const fetchAllPlayersSuccess = allPlayers => ({
  type: FETCH_ALL_PLAYERS_SUCCESS,
  payload: { allPlayers },
});

export const fetchAllPlayersFailure = allPlayersFail => ({
  type: FETCH_ALL_PLAYERS_FAILURE,
  payload: { allPlayersFail },
});

function getAllPlayers() {
  return fetch("/data/all-players.json")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchAllPlayers() {
  return dispatch => {
    dispatch(fetchAllPlayersBegin());
    return getAllPlayers()
      .then(data => {
        dispatch(fetchAllPlayersSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchAllPlayersFailure(error)));
  };
}
