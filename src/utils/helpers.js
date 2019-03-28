/* eslint-disable no-useless-escape */
import moment from "moment";

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function espnLogo(teamAbrv, size = 24, sport = "mlb") {
  const teamName = teamAbrv === "CWS" ? "CHW" : teamAbrv;
  return `http://a.espncdn.com/combiner/i?img=/i/teamlogos/${sport}/500/scoreboard/${teamName.toLowerCase()}.png&h=${size}&w=${size}`;
}

export const UsaTodayHeadshotNoBackgroundImage = (urlArg, imgSize) => {
  const parts = urlArg.split("?imageID=");
  const searchParam = parts[parts.length - 1];
  return `https://www.gannett-cdn.com/usatsimg/image/thumb/${imgSize}-${imgSize}/${searchParam}.png`;
};

export const PlayerPhotoByID = playerId => {
  return `https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/mlb/low-res/${playerId}.png`;
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

export const SportsRadarID = {
  ARI: "25507be1-6a68-4267-bd82-e097d94b359b",
  ATL: "12079497-e414-450a-8bf2-29f91de646bf",
  BAL: "75729d34-bca7-4a0f-b3df-6f26c6ad3719",
  BOS: "93941372-eb4c-4c40-aced-fe3267174393",
  CHC: "55714da8-fcaf-4574-8443-59bfb511a524",
  CIN: "c874a065-c115-4e7d-b0f0-235584fb0e6f",
  CLE: "80715d0d-0d2a-450f-a970-1b9a3b18c7e7",
  COL: "29dd9a87-5bcc-4774-80c3-7f50d985068b",
  CWS: "47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8",
  DET: "575c19b7-4052-41c2-9f0a-1c5813d02f99",
  HOU: "eb21dadd-8f10-4095-8bf3-dfb3b779f107",
  KC: "833a51a9-0d84-410f-bd77-da08c3e5e26e",
  LAA: "4f735188-37c8-473d-ae32-1f7e34ccf892",
  LAD: "ef64da7f-cfaf-4300-87b0-9313386b977c",
  MIA: "03556285-bdbb-4576-a06d-42f71f46ddc5",
  MIL: "dcfd5266-00ce-442c-bc09-264cd20cf455",
  MIN: "aa34e0ed-f342-4ec6-b774-c79b47b60e2d",
  NYM: "f246a5e5-afdb-479c-9aaa-c68beeda7af6",
  NYY: "a09ec676-f887-43dc-bbb3-cf4bbaee9a18",
  OAK: "27a59d3b-ff7c-48ea-b016-4798f560f5e1",
  PHI: "2142e1ba-3b40-445c-b8bb-f1f8b1054220",
  PIT: "481dfe7e-5dab-46ab-a49f-9dcc2b6e2cfd",
  SD: "d52d5339-cbdd-43f3-9dfa-a42fd588b9a3",
  SEA: "43a39081-52b4-4f93-ad29-da7f329ea960",
  SF: "a7723160-10b7-4277-a309-d8dd95a8ae65",
  STL: "44671792-dc02-4fdd-a5ad-f5f17edaa9d7",
  TB: "bdc11650-6f74-49c4-875e-778aeb7632d9",
  TEX: "d99f919b-1534-4516-8e8a-9cd106c6d8cd",
  TOR: "1d678440-b4b1-4954-9b39-70afb3ebbcfa",
  WSH: "d89bed32-3aee-4407-99e3-4103641b999a",
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

export const DefualtAvatar =
  "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/mlb/low-res/0.png";

export const RotoBallerReporters = {
  Staff: {
    Twitter: "@RotoBaller",
    Avatar: "https://avatars.io/twitter/RotoBaller",
  },
  "Caden Inaba": {
    Twitter: "@CadenTKC",
    Avatar: "https://avatars.io/twitter/CadenTKC",
  },
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

export const calcBattingAverage = (Hits, AtBats) => {
  if (AtBats <= 0) {
    return 0;
  }
  return Number.parseFloat(Hits / AtBats)
    .toFixed(3)
    .replace(/^0+/, "");
};

export const calcBattingOBP = (
  AtBats,
  Hits,
  Walks,
  HitbyPitch,
  SacrificeFlies
) => {
  if (AtBats <= 0) {
    return 0;
  }
  return Number.parseFloat(
    (Hits + Walks + HitbyPitch) / (AtBats + Walks + HitbyPitch + SacrificeFlies)
  )
    .toFixed(3)
    .replace(/^0+/, "");
};

export const calcBattingSlug = (
  AtBats,
  Singles,
  Doubles,
  Triples,
  HomeRuns
) => {
  if (AtBats <= 0) {
    return 0;
  }
  return Number.parseFloat(
    (Singles + 2 * Doubles + 3 * Triples + 4 * HomeRuns) / AtBats
  )
    .toFixed(3)
    .replace(/^0+/, "");
};
