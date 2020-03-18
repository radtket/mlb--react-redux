import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "./actions";

const initialState = {
  productsData: [],
  productsLoading: false,
  productsError: null,
};

export default (
  state = initialState,
  { type, productsData, productsError }
) => {
  switch (type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        productsLoading: true,
        productsError: null,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        productsData,
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        productsLoading: false,
        productsError,
        productsData: [],
      };

    default:
      return state;
  }
};
