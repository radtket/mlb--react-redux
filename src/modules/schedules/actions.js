import { handleErrors } from "../../utils/helpers";
// TODO: Add When API is Live
// import ApiHeadersMLB from "../../utils/api";

export const FETCH_SCHEDULES_BEGIN = "FETCH_SCHEDULES_BEGIN";
export const FETCH_SCHEDULES_SUCCESS = "FETCH_SCHEDULES_SUCCESS";
export const FETCH_SCHEDULES_FAILURE = "FETCH_SCHEDULES_FAILURE";

export const fetchSchedulesBegin = () => ({
  type: FETCH_SCHEDULES_BEGIN,
});

export const fetchSchedulesSuccess = schedules => ({
  type: FETCH_SCHEDULES_SUCCESS,
  schedules,
});

export const fetchSchedulesFailure = schedulesError => ({
  type: FETCH_SCHEDULES_FAILURE,
  schedulesError,
});

const getSchedules = (year = 2019) => {
  // TODO: Add When API is Live
  // return (
  //   fetch(
  //     `https://api.fantasydata.net/v3/mlb/stats/JSON/Games/${year}`,
  //     ApiHeadersMLB
  //   )
  return fetch(`/data/schedules-${year}.json`)
    .then(handleErrors)
    .then(res => res.json());
};

export const fetchSchedules = year => {
  return dispatch => {
    dispatch(fetchSchedulesBegin());
    return getSchedules(year)
      .then(data => {
        dispatch(fetchSchedulesSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchSchedulesFailure(error)));
  };
};
