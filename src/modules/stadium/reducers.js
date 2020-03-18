import {
  FETCH_STADIUMS_BEGIN,
  FETCH_STADIUMS_SUCCESS,
  FETCH_STADIUMS_FAILURE,
} from "./actions";

const initialState = {
  stadiumsData: [],
  stadiumsLoading: false,
  stadiumsError: null,
};

export default (
  state = initialState,
  { type, stadiumsData, stadiumsError }
) => {
  switch (type) {
    case FETCH_STADIUMS_BEGIN:
      return {
        ...state,
        stadiumsLoading: true,
        stadiumsError: null,
      };

    case FETCH_STADIUMS_SUCCESS:
      return {
        ...state,
        stadiumsLoading: false,
        stadiumsData,
      };

    case FETCH_STADIUMS_FAILURE:
      return {
        ...state,
        stadiumsLoading: false,
        stadiumsError,
        stadiumsData: [],
      };

    default:
      return state;
  }
};
