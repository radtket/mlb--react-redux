import { handleErrors, handleSuccess } from "../../utils/helpers";

export const FETCH_STADIUMS_BEGIN = "FETCH_STADIUMS_BEGIN";
export const FETCH_STADIUMS_SUCCESS = "FETCH_STADIUMS_SUCCESS";
export const FETCH_STADIUMS_FAILURE = "FETCH_STADIUMS_FAILURE";

export const fetchStadiumsBegin = () => ({
  type: FETCH_STADIUMS_BEGIN,
});

export const fetchStadiumsSuccess = stadiumsData => ({
  type: FETCH_STADIUMS_SUCCESS,
  stadiumsData,
});

export const fetchStadiumsFailure = stadiumsError => ({
  type: FETCH_STADIUMS_FAILURE,
  stadiumsError,
});

const getStadiums = () => {
  return fetch(`${process.env.PUBLIC_URL}/data/stadiums.json`)
    .then(handleErrors)
    .then(handleSuccess);
};

export const fetchStadiums = () => {
  return dispatch => {
    dispatch(fetchStadiumsBegin());
    return getStadiums()
      .then(data => {
        dispatch(fetchStadiumsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchStadiumsFailure(error)));
  };
};
