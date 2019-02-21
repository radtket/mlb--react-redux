/* eslint-disable no-useless-escape */
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

export const birthday = dob => moment().diff(dob, "years", false);

export const inchesToFeet = inches => {
  const feetFromInches = Math.floor(inches / 12);
  const inchesRemainder = inches % 12;
  return `${feetFromInches}' ${inchesRemainder}"`;
};

export const propComparator = propArg => {
  return (a, b) => {
    if (a[propArg] > b[propArg]) {
      return 1;
    }
    if (b[propArg] > a[propArg]) {
      return -1;
    }
    return 0;
  };
};

export const smallestToLargest = propArg => {
  return (a, b) => {
    if (a[propArg] > b[propArg]) {
      return 1;
    }
    if (b[propArg] > a[propArg]) {
      return -1;
    }
    return 0;
  };
};

export const largestToSmallest = propArg => {
  return (a, b) => {
    if (a[propArg] < b[propArg]) {
      return 1;
    }
    if (b[propArg] < a[propArg]) {
      return -1;
    }
    return 0;
  };
};

export const sortTeamsByDivion = allTeams => {
  return Object.entries(
    allTeams.reduce((teams, team) => {
      const { League, Division } = team;
      const teamsSortedByDivision = teams;
      teamsSortedByDivision[`${League} ${Division}`] =
        teamsSortedByDivision[`${League} ${Division}`] || [];
      teamsSortedByDivision[`${League} ${Division}`].push(team);
      return teamsSortedByDivision;
    }, {})
  ).sort();
};

export const getLeagueName = league =>
  league === "AL" ? "American League" : "National League";

export const slugify = string => {
  const a = "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;";
  const b = "aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------";
  const p = new RegExp(a.split("").join("|"), "g");
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
