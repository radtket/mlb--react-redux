import { handleErrors, handleSuccess } from "../../utils/helpers";
// import ApiHeadersMLB from "../../utils/api";

export const FETCH_PLAYER_BEGIN = "FETCH_PLAYER_BEGIN";
export const FETCH_PLAYER_SUCCESS = "FETCH_PLAYER_SUCCESS";
export const FETCH_PLAYER_FAILURE = "FETCH_PLAYER_FAILURE";

export const fetchPlayerBegin = () => ({
  type: FETCH_PLAYER_BEGIN,
});

export const fetchPlayerSuccess = player => ({
  type: FETCH_PLAYER_SUCCESS,
  payload: { player },
});

export const fetchPlayerFailure = playerFail => ({
  type: FETCH_PLAYER_FAILURE,
  payload: { playerFail },
});

const getPlayer = (playerArg, season = 2018) => {
  // TODO: Add When API is Live
  // return Promise.all([
  //   fetch(
  //     `https://api.fantasydata.net/v3/mlb/stats/json/PlayerSeasonStatsByPlayer/${season}/${playerArg}`,
  //     ApiHeadersMLB
  //   )
  //     .then(handleErrors)
  //     .then(handleSuccess),
  //   fetch(
  //     `https://api.fantasydata.net/v3/mlb/stats/JSON/Player/${playerArg}`,
  //     ApiHeadersMLB
  //   )
  //     .then(handleErrors)
  //     .then(handleSuccess),
  // ]);

  console.log({ season });

  return Promise.all([
    fetch(`/data/players/PlayerSeasonStatsByPlayer.${playerArg}.json`)
      .then(handleErrors)
      .then(handleSuccess),
    fetch(`/data/players/PlayerDetailsByPlayer.${playerArg}.json`)
      .then(handleErrors)
      .then(handleSuccess),
  ]);
};

export const fetchPlayer = playerArg => {
  return dispatch => {
    dispatch(fetchPlayerBegin());
    return getPlayer(playerArg)
      .then(data => {
        const combinedData = { ...data[0], ...data[1] };
        dispatch(fetchPlayerSuccess(combinedData));
        return combinedData;
      })
      .catch(error => dispatch(fetchPlayerFailure(error)));
  };
};
