import { handleErrors, handleSuccess } from "../../utils/helpers";

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
  return fetch(`${process.env.PUBLIC_URL}/data/teams-with-stadiums.json`)
    .then(handleErrors)
    .then(handleSuccess);
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
