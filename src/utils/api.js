export const ApiHeadersMLB = {
  headers: new Headers({
    "Ocp-Apim-Subscription-Key": process.env.REACT_APP_FANTASYDATA_MLB_API_KEY,
  }),
};

export const MySportsFeedsHeadersMLB = {
  headers: new Headers({
    Authorization: `Basic ${btoa(
      `${process.env.REACT_APP_MYSPORTSFEEDS_API_KEY}:MYSPORTSFEEDS`
    )}`,
  }),
};
