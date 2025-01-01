import { handleErrors, handleSuccess } from "../../utils/helpers";

export const FETCH_ALL_PLAYERS_BEGIN = "FETCH_ALL_PLAYERS_BEGIN";
export const FETCH_ALL_PLAYERS_SUCCESS = "FETCH_ALL_PLAYERS_SUCCESS";
export const FETCH_ALL_PLAYERS_FAILURE = "FETCH_ALL_PLAYERS_FAILURE";

export const fetchAllPlayersBegin = () => ({
  type: FETCH_ALL_PLAYERS_BEGIN,
});

export const fetchAllPlayersSuccess = allPlayersData => ({
  type: FETCH_ALL_PLAYERS_SUCCESS,
  allPlayersData,
});

export const fetchAllPlayersFailure = allPlayersError => ({
  type: FETCH_ALL_PLAYERS_FAILURE,
  allPlayersError,
});

export const fetchAllPlayers = () => {
  return dispatch => {
    dispatch(fetchAllPlayersBegin());
    return fetch(`${process.env.PUBLIC_URL}/data/all-players.json`)
      .then(handleErrors)
      .then(handleSuccess)
      .then(data => {
        dispatch(fetchAllPlayersSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchAllPlayersFailure(error)));
  };
};
