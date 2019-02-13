import fetch from "cross-fetch";
import { handleErrors } from "../../utils/helpers";

export const FETCH_STANDINGS_BEGIN = "FETCH_STANDINGS_BEGIN";
export const FETCH_STANDINGS_SUCCESS = "FETCH_STANDINGS_SUCCESS";
export const FETCH_STANDINGS_FAILURE = "FETCH_STANDINGS_FAILURE";

export const fetchStandingsBegin = () => ({
  type: FETCH_STANDINGS_BEGIN
});

export const fetchStandingsSuccess = standings => ({
  type: FETCH_STANDINGS_SUCCESS,
  payload: { standings }
});

export const fetchStandingsFailure = standingsFail => ({
  type: FETCH_STANDINGS_FAILURE,
  payload: { standingsFail }
});

function getStandings() {
  return fetch("/data/standings.json")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchStandings() {
  return dispatch => {
    dispatch(fetchStandingsBegin());
    return getStandings()
      .then(data => {
        dispatch(fetchStandingsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchStandingsFailure(error)));
  };
}
