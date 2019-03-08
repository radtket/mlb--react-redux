const ApiHeadersMLB = {
  headers: new Headers({
    "Ocp-Apim-Subscription-Key": process.env.REACT_APP_FANTASYDATA_MLB_API_KEY,
  }),
};

export default ApiHeadersMLB;
