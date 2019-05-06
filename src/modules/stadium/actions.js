import { handleErrors } from "../../utils/helpers";

export const FETCH_STADIUMS_BEGIN = "FETCH_STADIUMS_BEGIN";
export const FETCH_STADIUMS_SUCCESS = "FETCH_STADIUMS_SUCCESS";
export const FETCH_STADIUMS_FAILURE = "FETCH_STADIUMS_FAILURE";

export const fetchStadiumsBegin = () => ({
  type: FETCH_STADIUMS_BEGIN,
});

export const fetchStadiumsSuccess = stadiums => ({
  type: FETCH_STADIUMS_SUCCESS,
  payload: { stadiums },
});

export const fetchStadiumsFailure = stadiumsFail => ({
  type: FETCH_STADIUMS_FAILURE,
  payload: { stadiumsFail },
});

function getStadiums() {
  return fetch("/data/stadiums.json")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchStadiums() {
  return dispatch => {
    dispatch(fetchStadiumsBegin());
    return getStadiums()
      .then(data => {
        dispatch(fetchStadiumsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchStadiumsFailure(error)));
  };
}
