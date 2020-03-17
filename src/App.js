import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Pages
import {
  // Counters,
  GamesOnDay,
  Home,
  LeagueLeadersTeams,
  NewsAllTeamsList,
  PlayerList,
  ProductList,
  RedditAsyncApp,
  SchedulesList,
  StandingsList,
  Team,
  TeamSplitsList,
} from "./pages";

// Actions
import { fetchTeams, fetchSchedules, fetchStandings } from "./modules/actions";

// Components
import Navbar from "./components/Navbar";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const dispatch = useDispatch();

  const {
    schedules,
    schedulesError,
    schedulesLoading,
    standingsError,
    standingsLoading,
    teams,
    teamsFail,
    teamsLoading,
  } = useSelector(state => {
    return {
      ...state.teams,
      ...state.schedules,
      ...state.standings,
    };
  });

  useEffect(() => {
    const componentDidMount = () => {
      dispatch(fetchTeams());
      dispatch(fetchSchedules(2019));
      dispatch(fetchStandings());
    };
    componentDidMount();
  }, [dispatch]);

  if (teamsFail) {
    return <ErrorMessage error={teamsFail} />;
  }

  if (schedulesError) {
    return <ErrorMessage error={schedulesError} />;
  }

  if (standingsError) {
    return <ErrorMessage error={standingsError} />;
  }

  if (teamsLoading || schedulesLoading || standingsLoading) {
    return <div className="loadingBar" />;
  }

  return (
    <div>
      <Navbar {...{ teams }} />
      <main>
        <Route component={Home} exact path="/" />
        {/* <Route component={Counters} exact path="/counter" /> */}
        <Route component={GamesOnDay} exact path="/scores" />
        <Route component={LeagueLeadersTeams} exact path="/stats" />
        <Route component={NewsAllTeamsList} exact path="/news" />
        <Route component={PlayerList} exact path="/player/:playerArg" />
        <Route component={ProductList} exact path="/product" />
        <Route component={RedditAsyncApp} exact path="/reddit" />
        <Route component={SchedulesList} exact path="/schedule" />
        <Route component={StandingsList} exact path="/standings" />
        <Route component={TeamSplitsList} exact path="/splits" />
        <Route
          path="/teams/:teamAbrv"
          render={props => <Team {...props} {...{ teams, schedules }} />}
        />
      </main>
    </div>
  );
};

export default App;
