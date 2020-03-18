import { handleErrors } from "../../utils/helpers";

export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products },
});

export const fetchProductsFailure = productsFail => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { productsFail },
});

const getProducts = () => {
  return fetch("/data/teams-with-stadiums.json")
    .then(handleErrors)
    .then(res => res.json());
};

export const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return getProducts()
      .then(data => {
        dispatch(fetchProductsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
};
