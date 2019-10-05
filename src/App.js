import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

// Pages
import {
  Counters,
  GamesOnDayList,
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

const App = ({
  fetchSchedules: getSchedules,
  fetchStandings: getStandings,
  fetchTeams: getTeams,
  schedules,
  schedulesError,
  schedulesLoading,
  standingsError,
  standingsLoading,
  teams,
  teamsFail,
  teamsLoading,
}) => {
  useEffect(() => {
    getTeams();
    getSchedules(2019);
    getStandings();
  }, []);

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
        <Route exact path="/" component={Home} />
        <Route exact path="/counter" component={Counters} />
        <Route exact path="/news" component={NewsAllTeamsList} />
        <Route exact path="/player/:playerArg" component={PlayerList} />
        <Route exact path="/product" component={ProductList} />
        <Route exact path="/reddit" component={RedditAsyncApp} />
        <Route exact path="/schedule" component={SchedulesList} />
        <Route exact path="/scores" component={GamesOnDayList} />
        <Route exact path="/splits" component={TeamSplitsList} />
        <Route exact path="/standings" component={StandingsList} />
        <Route exact path="/stats" component={LeagueLeadersTeams} />
        <Route
          path="/teams/:teamAbrv"
          render={props => <Team {...props} {...{ teams, schedules }} />}
        />
      </main>
    </div>
  );
};

App.propTypes = {
  fetchSchedules: PropTypes.func.isRequired,
  fetchStandings: PropTypes.func.isRequired,
  fetchTeams: PropTypes.func.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
  schedulesError: null || PropTypes.bool,
  schedulesLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamsFail: null || PropTypes.bool,
  teamsLoading: PropTypes.bool.isRequired,
};

App.defaultProps = {
  teamsFail: null,
  schedulesError: null,
  standingsError: null,
};

const mapStateToProps = ({ teams, schedules, standings }) => {
  return {
    ...teams,
    ...schedules,
    ...standings,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeams,
      fetchSchedules,
      fetchStandings,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(App);
