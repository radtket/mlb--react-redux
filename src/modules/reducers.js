import { combineReducers } from "redux";
import counter from "./counter/reducers";
import gamesOnDay from "./games-on-day/reducers";
import newsAllTeams from "./newsAllTeams/reducers";
import newsTeams from "./newsTeam/reducers";
import player from "./player/reducers";
import playerNews from "./playerNews/reducers";
import playerStats from "./playerStats/reducers";
import leagueLeaders from "./leagueLeaders/reducers";
import { postsBySubreddit, selectedSubreddit } from "./reddit/reddit-reducers";
import products from "./product/reducers";
import schedules from "./schedules/reducers";
import sportsRadarGames from "./sportsRadarGame/reducers";
import standings from "./standings/reducers";
import teamDepths from "./teamDepth/reducers";
import teamRoster from "./teamRoster/reducers";
import teamRssNews from "./teamRssNews/reducers";
import teams from "./teams/reducer";
import teamSplits from "./teamSplits/reducers";
import teamStats from "./teamStats/reducers";
import tickets from "./ticket/reducers";

export default combineReducers({
  counter,
  gamesOnDay,
  newsAllTeams,
  newsTeams,
  player,
  playerNews,
  playerStats,
  postsBySubreddit,
  products,
  sportsRadarGames,
  teamSplits,
  leagueLeaders,
  schedules,
  selectedSubreddit,
  standings,
  teamDepths,
  teamRoster,
  teamRssNews,
  teams,
  teamStats,
  tickets,
});
