import { handleErrors } from "../../utils/helpers";
// TODO: Add When API is Live
// import ApiHeadersMLB from "../../utils/api";

export const FETCH_STANDINGS_BEGIN = "FETCH_STANDINGS_BEGIN";
export const FETCH_STANDINGS_SUCCESS = "FETCH_STANDINGS_SUCCESS";
export const FETCH_STANDINGS_FAILURE = "FETCH_STANDINGS_FAILURE";

export const fetchStandingsBegin = () => ({
  type: FETCH_STANDINGS_BEGIN,
});

export const fetchStandingsSuccess = standings => ({
  type: FETCH_STANDINGS_SUCCESS,
  payload: { standings },
});

export const fetchStandingsFailure = standingsFail => ({
  type: FETCH_STANDINGS_FAILURE,
  payload: { standingsFail },
});

function getStandings(season = 2019) {
  // TODO: Add When API is Live
  // return (
  //   fetch(
  //     `https://api.fantasydata.net/v3/mlb/scores/JSON/Standings/${season}`,
  //     ApiHeadersMLB
  //   )
  return fetch(`/data/mlb/standings-${season}.json`)
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchStandings() {
  return dispatch => {
    dispatch(fetchStandingsBegin());
    return getStandings()
      .then(data => {
        dispatch(fetchStandingsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchStandingsFailure(error)));
  };
}
