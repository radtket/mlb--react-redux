import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from "./actions";

const initialState = {
  productsData: [],
  productsLoading: false,
  productsError: null
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        productsLoading: true,
        productsError: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the productsData with the ones from the server
      return {
        ...state,
        productsLoading: false,
        productsData: action.payload.products
      };

    case FETCH_PRODUCTS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have productsData to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the productsData
      // around! Do whatever seems right.
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload.error,
        productsData: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
