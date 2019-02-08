export const FETCH_SCHEDULES_BEGIN = "FETCH_SCHEDULES_BEGIN";
export const FETCH_SCHEDULES_SUCCESS = "FETCH_SCHEDULES_SUCCESS";
export const FETCH_SCHEDULES_FAILURE = "FETCH_SCHEDULES_FAILURE";

export const fetchSchedulesBegin = () => ({
  type: FETCH_SCHEDULES_BEGIN
});

export const fetchSchedulesSuccess = schedules => ({
  type: FETCH_SCHEDULES_SUCCESS,
  payload: { schedules }
});

export const fetchSchedulesFailure = error => ({
  type: FETCH_SCHEDULES_FAILURE,
  payload: { error }
});

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function getSchedules() {
  return fetch("/data/schedules.json")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchSchedules() {
  return dispatch => {
    dispatch(fetchSchedulesBegin());
    return getSchedules()
      .then(data => {
        dispatch(fetchSchedulesSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchSchedulesFailure(error)));
  };
}
