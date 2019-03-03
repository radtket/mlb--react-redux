import { combineReducers } from "redux";
import counter from "./counter";
import products from "./product/reducers";
import teamStats from "./teamStats/reducers";
import player from "./player/reducers";
import gamesOnDay from "./games-on-day/reducers";
import schedules from "./schedules/reducers";
import newsAllTeams from "./newsAllTeams/reducers";
import teamRoster from "./teamRoster/reducers";
import teams from "./teams/reducer";
import standings from "./standings/reducers";
import { postsBySubreddit, selectedSubreddit } from "./reddit/reddit-reducers";

export default combineReducers({
  counter,
  postsBySubreddit,
  selectedSubreddit,
  standings,
  products,
  teamStats,
  player,
  gamesOnDay,
  schedules,
  newsAllTeams,
  teamRoster,
  teams,
});
