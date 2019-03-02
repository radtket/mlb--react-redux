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

export const UsaTodayHeadshotNoBackgroundImage = (urlArg, imgSize) => {
  const parts = urlArg.split("?imageID=");
  const searchParam = parts[parts.length - 1];
  return `https://www.gannett-cdn.com/usatsimg/image/thumb/${imgSize}-${imgSize}/${searchParam}.png`;
};

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

export const getNumberWithOrdinal = n => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const inningHalfDecoder = inningArg => {
  let inning;
  switch (inningArg) {
    case "B":
      inning = "Bottom ";
      break;
    case "T":
      inning = "Top ";
      break;
    default:
      inning = "Middle ";
  }
  return inning;
};

// teams.reduce((allTeams, team) => {
//   const { Key, City, Name, PrimaryColor } = team;
//   allTeams.push({ Key, City, Name, PrimaryColor });
//   return allTeams;
// }, []);

export const teamFinder = teamKey => {
  return [
    {
      Key: "LAD",
      City: "Los Angeles",
      Name: "Dodgers",
      PrimaryColor: "005A9C",
    },
    {
      Key: "CIN",
      City: "Cincinnati",
      Name: "Reds",
      PrimaryColor: "C6011F",
    },
    {
      Key: "TOR",
      City: "Toronto",
      Name: "Blue Jays",
      PrimaryColor: "134A8E",
    },
    {
      Key: "PIT",
      City: "Pittsburgh",
      Name: "Pirates",
      PrimaryColor: "000000",
    },
    {
      Key: "KC",
      City: "Kansas City",
      Name: "Royals",
      PrimaryColor: "004687",
    },
    {
      Key: "CHC",
      City: "Chicago",
      Name: "Cubs",
      PrimaryColor: "0E3386",
    },
    {
      Key: "CLE",
      City: "Cleveland",
      Name: "Indians",
      PrimaryColor: "E31937",
    },
    {
      Key: "TB",
      City: "Tampa Bay",
      Name: "Rays",
      PrimaryColor: "092C5C",
    },
    {
      Key: "PHI",
      City: "Philadelphia",
      Name: "Phillies",
      PrimaryColor: "E81828",
    },
    {
      Key: "SEA",
      City: "Seattle",
      Name: "Mariners",
      PrimaryColor: "0C2C56",
    },
    {
      Key: "ARI",
      City: "Arizona",
      Name: "Diamondbacks",
      PrimaryColor: "A71930",
    },
    {
      Key: "SF",
      City: "San Francisco",
      Name: "Giants",
      PrimaryColor: "FD5A1E",
    },
    {
      Key: "CHW",
      City: "Chicago",
      Name: "White Sox",
      PrimaryColor: "000000",
    },
    {
      Key: "DET",
      City: "Detroit",
      Name: "Tigers",
      PrimaryColor: "0C2C56",
    },
    {
      Key: "NYM",
      City: "New York",
      Name: "Mets",
      PrimaryColor: "002D72",
    },
    {
      Key: "BAL",
      City: "Baltimore",
      Name: "Orioles",
      PrimaryColor: "DF4601",
    },
    {
      Key: "MIN",
      City: "Minnesota",
      Name: "Twins",
      PrimaryColor: "002B5C",
    },
    {
      Key: "LAA",
      City: "Los Angeles",
      Name: "Angels",
      PrimaryColor: "BA0021",
    },
    {
      Key: "MIA",
      City: "Miami",
      Name: "Marlins",
      PrimaryColor: "000000",
    },
    {
      Key: "COL",
      City: "Colorado",
      Name: "Rockies",
      PrimaryColor: "33006F",
    },
    {
      Key: "OAK",
      City: "Oakland",
      Name: "Athletics",
      PrimaryColor: "003831",
    },
    {
      Key: "BOS",
      City: "Boston",
      Name: "Red Sox",
      PrimaryColor: "BD3039",
    },
    {
      Key: "ATL",
      City: "Atlanta",
      Name: "Braves",
      PrimaryColor: "13274F",
    },
    {
      Key: "TEX",
      City: "Texas",
      Name: "Rangers",
      PrimaryColor: "003278",
    },
    {
      Key: "NYY",
      City: "New York",
      Name: "Yankees",
      PrimaryColor: "132448",
    },
    {
      Key: "HOU",
      City: "Houston",
      Name: "Astros",
      PrimaryColor: "002D62",
    },
    {
      Key: "STL",
      City: "St. Louis",
      Name: "Cardinals",
      PrimaryColor: "C41E3A",
    },
    {
      Key: "MIL",
      City: "Milwaukee",
      Name: "Brewers",
      PrimaryColor: "0A2351",
    },
    {
      Key: "SD",
      City: "San Diego",
      Name: "Padres",
      PrimaryColor: "05143F",
    },
    {
      Key: "WSH",
      City: "Washington",
      Name: "Nationals",
      PrimaryColor: "AB0003",
    },
  ].find(team => teamKey === team.Key);
};

export const socialMedia = {
  LAA: {
    Twitter: "Angels",
    Instagram: "angels",
  },
  HOU: {
    Twitter: "astros",
    Instagram: "astrosbaseball",
  },
  OAK: {
    Twitter: "Athletics",
    Instagram: "athletics",
  },
  BAL: {
    Twitter: "Orioles",
    Instagram: "baltimoreorioles",
  },
  TOR: {
    Twitter: "BlueJays",
    Instagram: "bluejays",
  },
  ATL: {
    Twitter: "Braves",
    Instagram: "braves",
  },
  MIL: {
    Twitter: "Brewers",
    Instagram: "brewers",
  },
  STL: {
    Twitter: "Cardinals",
    Instagram: "cardinals",
  },
  CHC: {
    Twitter: "Cubs",
    Instagram: "cubs",
  },
  ARI: {
    Twitter: "Dbacks",
    Instagram: "dbacks",
  },
  LAD: {
    Twitter: "Dodgers",
    Instagram: "dodgers",
  },
  CLE: {
    Twitter: "Indians",
    Instagram: "indians",
  },
  KC: {
    Twitter: "Royals",
    Instagram: "kcroyals",
  },
  SEA: {
    Twitter: "Mariners",
    Instagram: "mariners",
  },
  MIA: {
    Twitter: "Marlins",
    Instagram: "marlins",
  },
  NYM: {
    Twitter: "Mets",
    Instagram: "mets",
  },
  WAS: {
    Twitter: "Nationals",
    Instagram: "nationals",
  },
  SD: {
    Twitter: "Padres",
    Instagram: "padres",
  },
  PHI: {
    Twitter: "Phillies",
    Instagram: "phillies",
  },
  PIT: {
    Twitter: "Pirates",
    Instagram: "pirates",
  },
  TEX: {
    Twitter: "Rangers",
    Instagram: "rangers",
  },
  TB: {
    Twitter: "RaysBaseball",
    Instagram: "raysbaseball",
  },
  CIN: {
    Twitter: "Reds",
    Instagram: "redsbaseball",
  },
  BOS: {
    Twitter: "RedSox",
    Instagram: "redsox",
  },
  COL: {
    Twitter: "Rockies",
    Instagram: "rockies",
  },
  SF: {
    Twitter: "SFGiants",
    Instagram: "sfgiants",
  },
  DET: {
    Twitter: "tigers",
    Instagram: "tigers",
  },
  MIN: {
    Twitter: "Twins",
    Instagram: "twins",
  },
  CHW: {
    Twitter: "whitesox",
    Instagram: "whitesox",
  },
  NYY: {
    Twitter: "Yankees",
    Instagram: "yankees",
  },
};

export const PositionsBaseball = {
  SP: "Starting Pitcher",
  RP: "Relief Pitcer",
  CP: "Closer",
  P: "Pitcher",
  C: "Catcher",
  "1B": "1st Base",
  "2B": "2nd Base",
  "3B": "3rd Base",
  SS: "Shortstop",
  LF: "Left Field",
  CF: "Center Field",
  RF: "Right Field",
  OF: "Outfield",
  DH: "Designated hitter",
};

export const getExcerpt = (str, limit) => {
  const fullText = str;
  let shortText = str;
  shortText = `${shortText.substr(0, shortText.lastIndexOf(" ", limit))}...`;
  const returnString = {
    fullText,
    shortText,
  };
  return returnString;
};
