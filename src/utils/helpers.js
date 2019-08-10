/* eslint-disable no-useless-escape */
import { differenceInYears, format } from "date-fns";
import tinycolor from "tinycolor2";
import MLBAMIDs from "./MLBAMIDs";

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const isObjectEmpty = myObject => {
  return !Object.keys(myObject).length;
};

export const isArrayEmpty = arrayArg => {
  if (arrayArg && arrayArg.length) {
    return false;
  }
  return true;
};

export function espnLogo(teamAbrv, size = 24, sport = "mlb") {
  let teamName = teamAbrv;

  if (teamAbrv === "UTA") {
    teamName = "UTAH";
  }

  if (teamAbrv === "CWS") {
    teamName = "CHW";
  }
  return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/${sport.toLowerCase()}/500/${teamName.toLowerCase()}.png&h=${size}&w=${size}`;
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
export const DEV_PLACEHOLDER_DATE = format(new Date("2018-05-04T00:00:00"));

export const TodaysDate = format(new Date(), "YYYY-MM-DD");

export const formatApiArgDatedate = date => {
  return format(new Date(date), "YYYY-MM-DD");
};

export const birthday = dob => differenceInYears(new Date(), dob);

export const inchesToFeet = inches => {
  const feetFromInches = Math.floor(inches / 12);
  const inchesRemainder = inches % 12;
  return `${feetFromInches}' ${inchesRemainder}"`;
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
      const { Conference, League, Division } = team;
      const teamsSortedByDivision = teams;
      teamsSortedByDivision[`${League || ""} ${Division}`] =
        teamsSortedByDivision[`${League || ""} ${Division}`] || [];
      teamsSortedByDivision[`${League || ""} ${Division}`].push(team);
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
//   const { Key, Name, City, PrimaryColor, SecondaryColor } = team;
//   allTeams[Key] = { Name, City, PrimaryColor, SecondaryColor };
//   return allTeams;
// }, {});

export const stubHubTeamHelper = {
  Dodgers: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/LA_Dodgers.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/2/20/Los_Angeles_Dodgers_Logo.png",
    Key: "LAD",
  },
  Reds: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/71/Cincinnati_Reds_Cap_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/01/Cincinnati_Reds_Logo.svg",
    Key: "CIN",
  },
  "Blue Jays": {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Toronto_Blue_Jays_cap.svg/119px-Toronto_Blue_Jays_cap.svg.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/ba/Toronto_Blue_Jays_logo.svg",
    Key: "TOR",
  },
  Pirates: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Pittsburgh_Pirates_Cap_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Pittsburgh_Pirates_logo_2014.svg",
    Key: "PIT",
  },
  Royals: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Kansas_City_Royals_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/Kansas_City_Royals.svg",
    Key: "KC",
  },
  Cubs: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Chicago_Cubs_Cap_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Chicago_Cubs_logo.svg",
    Key: "CHC",
  },
  Indians: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Cleveland_Indians_cap_logo.svg/439px-Cleveland_Indians_cap_logo.svg.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Cleveland_Indians_primary_logo.svg",
    Key: "CLE",
  },
  Rays: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e2/ALE-TB-Insignia.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c6/Tampa_Bay_Rays.svg",
    Key: "TB",
  },
  Phillies: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Philadelphia_Phillies_Insignia.svg/100px-Philadelphia_Phillies_Insignia.svg.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/47/New_Phillies_logo.png",
    Key: "PHI",
  },
  Mariners: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/8a/Seattle_Mariners_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/b0/Seattle_Mariners_logo.svg",
    Key: "SEA",
  },
  Diamondbacks: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Arizona_Diamondbacks_cap_logo.svg/114px-Arizona_Diamondbacks_cap_logo.svg.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/89/Arizona_Diamondbacks_logo.svg",
    Key: "ARI",
  },
  Giants: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/San_Francisco_Giants_Cap_Insignia.svg/97px-San_Francisco_Giants_Cap_Insignia.svg.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/58/San_Francisco_Giants_Logo.svg",
    Key: "SF",
  },
  "White Sox": {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/Chicago_White_Sox_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Chicago_White_Sox.svg",
    Key: "CHW",
  },
  Tigers: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Detroit_Tigers_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Detroit_Tigers_logo.svg",
    Key: "DET",
  },
  Mets: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7b/New_York_Mets.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7b/New_York_Mets.svg",
    Key: "NYM",
  },
  Orioles: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Baltimore_Orioles_cap.svg/105px-Baltimore_Orioles_cap.svg.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/75/Baltimore_Orioles_cap.svg",
    Key: "BAL",
  },
  Twins: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/en/2/2f/Minnesota_Twins_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/71/Minnesota_Twins_logo.svg",
    Key: "MIN",
  },
  Angels: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/79/Los_Angeles_Angels_of_Anaheim_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8b/Los_Angeles_Angels_of_Anaheim.svg",
    Key: "LAA",
  },
  Marlins: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Marlins_cap_insignia.svg/800px-Marlins_cap_insignia.svg.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Marlins_team_logo.svg/800px-Marlins_team_logo.svg.png",
    Key: "MIA",
  },
  Rockies: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Colorado_Rockies_Cap_Insignia.svg/97px-Colorado_Rockies_Cap_Insignia.svg.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Colorado_Rockies_logo.svg",
    Key: "COL",
  },
  Athletics: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Oakland_Athletics_cap_logo.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Oakland_A%27s_logo.svg",
    Key: "OAK",
  },
  "Red Sox": {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/21/Bosb.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/6d/RedSoxPrimary_HangingSocks.svg",
    Key: "BOS",
  },
  Braves: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/Atlanta_Braves_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/f2/Atlanta_Braves.svg",
    Key: "ATL",
  },
  Rangers: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e2/Texas_Rangers_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/41/Texas_Rangers.svg",
    Key: "TEX",
  },
  Yankees: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/70/NewYorkYankees_caplogo.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/2/25/NewYorkYankees_PrimaryLogo.svg",
    Key: "NYY",
  },
  Astros: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Houston_Astros_cap_logo.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/Houston-Astros-Logo.svg",
    Key: "HOU",
  },
  Cardinals: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/St_Louis_Cardinals_Cap_Insignia.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/9d/St._Louis_Cardinals_logo.svg",
    Key: "STL",
  },
  Brewers: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/4a/MilwaukeeBrewers_caplogo.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/1/11/Milwaukee_Brewers_Logo.svg",
    Key: "MIL",
  },
  Padres: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/San_Diego_Padres_logotype.svg/100px-San_Diego_Padres_logotype.svg.png",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/SDPadres_logo.svg",
    Key: "SD",
  },
  Nationals: {
    WikipediaWordMarkUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Washington_Nationals_Cap_Insig.svg",
    WikipediaLogoUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/a3/Washington_Nationals_logo.svg",
    Key: "WSH",
  },
};

export const teamFinder = {
  LAD: {
    Name: "Dodgers",
    City: "Los Angeles",
    PrimaryColor: "#005A9C",
    SecondaryColor: "#FFFFFF",
  },
  CIN: {
    Name: "Reds",
    City: "Cincinnati",
    PrimaryColor: "#C6011F",
    SecondaryColor: "#000000",
  },
  TOR: {
    Name: "Blue Jays",
    City: "Toronto",
    PrimaryColor: "#134A8E",
    SecondaryColor: "#1D2D5C",
  },
  PIT: {
    Name: "Pirates",
    City: "Pittsburgh",
    PrimaryColor: "#000000",
    SecondaryColor: "#FDB827",
  },
  KC: {
    Name: "Royals",
    City: "Kansas City",
    PrimaryColor: "#004687",
    SecondaryColor: "#C09A5B",
  },
  CHC: {
    Name: "Cubs",
    City: "Chicago",
    PrimaryColor: "#0E3386",
    SecondaryColor: "#CC3433",
  },
  CLE: {
    Name: "Indians",
    City: "Cleveland",
    PrimaryColor: "#E31937",
    SecondaryColor: "#002B5C",
  },
  TB: {
    Name: "Rays",
    City: "Tampa Bay",
    PrimaryColor: "#092C5C",
    SecondaryColor: "#8FBCE6",
  },
  PHI: {
    Name: "Phillies",
    City: "Philadelphia",
    PrimaryColor: "#E81828",
    SecondaryColor: "#284898",
  },
  SEA: {
    Name: "Mariners",
    City: "Seattle",
    PrimaryColor: "#0C2C56",
    SecondaryColor: "#C4CED4",
  },
  ARI: {
    Name: "Diamondbacks",
    City: "Arizona",
    PrimaryColor: "#A71930",
    SecondaryColor: "#E3D4AD",
  },
  SF: {
    Name: "Giants",
    City: "San Francisco",
    PrimaryColor: "#FD5A1E",
    SecondaryColor: "#000000",
  },
  CHW: {
    Name: "White Sox",
    City: "Chicago",
    PrimaryColor: "#000000",
    SecondaryColor: "#C4CED4",
  },
  DET: {
    Name: "Tigers",
    City: "Detroit",
    PrimaryColor: "#0C2C56",
    SecondaryColor: "#FF6600",
  },
  NYM: {
    Name: "Mets",
    City: "New York",
    PrimaryColor: "#002D72",
    SecondaryColor: "#FF5910",
  },
  BAL: {
    Name: "Orioles",
    City: "Baltimore",
    PrimaryColor: "#DF4601",
    SecondaryColor: "#000000",
  },
  MIN: {
    Name: "Twins",
    City: "Minnesota",
    PrimaryColor: "#002B5C",
    SecondaryColor: "#D31145",
  },
  LAA: {
    Name: "Angels",
    City: "Los Angeles",
    PrimaryColor: "#BA0021",
    SecondaryColor: "#003263",
  },
  MIA: {
    Name: "Marlins",
    City: "Miami",
    PrimaryColor: "#000000",
    SecondaryColor: "#FF6600",
  },
  COL: {
    Name: "Rockies",
    City: "Colorado",
    PrimaryColor: "#33006F",
    SecondaryColor: "#000000",
  },
  OAK: {
    Name: "Athletics",
    City: "Oakland",
    PrimaryColor: "#003831",
    SecondaryColor: "#EFB21E",
  },
  BOS: {
    Name: "Red Sox",
    City: "Boston",
    PrimaryColor: "#BD3039",
    SecondaryColor: "#0D2B56",
  },
  ATL: {
    Name: "Braves",
    City: "Atlanta",
    PrimaryColor: "#13274F",
    SecondaryColor: "#CE1141",
  },
  TEX: {
    Name: "Rangers",
    City: "Texas",
    PrimaryColor: "#003278",
    SecondaryColor: "#C0111F",
  },
  NYY: {
    Name: "Yankees",
    City: "New York",
    PrimaryColor: "#132448",
    SecondaryColor: "#C4CED4",
  },
  HOU: {
    Name: "Astros",
    City: "Houston",
    PrimaryColor: "#002D62",
    SecondaryColor: "#EB6E1F",
  },
  STL: {
    Name: "Cardinals",
    City: "St. Louis",
    PrimaryColor: "#C41E3A",
    SecondaryColor: "#000066",
  },
  MIL: {
    Name: "Brewers",
    City: "Milwaukee",
    PrimaryColor: "#0A2351",
    SecondaryColor: "#B6922E",
  },
  SD: {
    Name: "Padres",
    City: "San Diego",
    PrimaryColor: "#05143F",
    SecondaryColor: "#FFFFFF",
  },
  WSH: {
    Name: "Nationals",
    City: "Washington",
    PrimaryColor: "#AB0003",
    SecondaryColor: "#11225B",
  },
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
  WSH: {
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

export const findMLBID = playerIdArg => {
  const FoundMLBAMID = MLBAMIDs.find(player => {
    const { PlayerID, MLBAMID } = player;
    if (PlayerID === playerIdArg) {
      return MLBAMID;
    }
    return false;
  });
  return FoundMLBAMID && FoundMLBAMID.MLBAMID;
};

export const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const LightenOrDarkenColor = colorArg => {
  const tinyColorArg = tinycolor(colorArg);
  if (tinyColorArg.isDark()) {
    return tinyColorArg.lighten().toString();
  }
  return tinyColorArg.darken().toString();
};

export const splitPlayerName = name => {
  const splitName = name.split(" ");
  splitName[0] = `${splitName[0].charAt(0)}.`;
  return splitName.join(" ");
};

export const roundHalf = num => {
  return Math.round(num * 2) / 2;
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
