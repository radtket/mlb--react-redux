import moment from "moment";

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function espnLogo(teamAbrv, size = 24, sport = "mlb") {
  return `http://a.espncdn.com/combiner/i?img=/i/teamlogos/${sport}/500/scoreboard/${teamAbrv.toLowerCase()}.png&h=${size}&w=${size}`;
}

// TODO: remove in production with Todays date
export const DEV_PLACEHOLDER_DATE = moment("2018-05-04T00:00:00");

export const TodaysDate = moment({}).format("YYYY-MM-DD");

export const formatApiArgDatedate = date => {
  return moment(date).format("YYYY-MM-DD");
};
