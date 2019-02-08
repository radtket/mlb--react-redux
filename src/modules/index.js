import { combineReducers } from "redux";
import counter from "./counter";
import products from "./product/reducers";
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
  schedules,
  newsAllTeams,
  teamRoster,
  teams
});
