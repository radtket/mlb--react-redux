export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function getProducts() {
  return fetch("/data/actions-teams-all.json")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return getProducts()
      .then(data => {
        dispatch(fetchProductsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}
