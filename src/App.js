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
    const componentDidMount = () => {
      getTeams();
      getSchedules(2019);
      getStandings();
    };
    componentDidMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Route component={Home} exact path="/" />
        <Route component={Counters} exact path="/counter" />
        <Route component={NewsAllTeamsList} exact path="/news" />
        <Route component={PlayerList} exact path="/player/:playerArg" />
        <Route component={ProductList} exact path="/product" />
        <Route component={RedditAsyncApp} exact path="/reddit" />
        <Route component={SchedulesList} exact path="/schedule" />
        <Route component={GamesOnDayList} exact path="/scores" />
        <Route component={TeamSplitsList} exact path="/splits" />
        <Route component={StandingsList} exact path="/standings" />
        <Route component={LeagueLeadersTeams} exact path="/stats" />
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
  schedulesError: PropTypes.bool,
  schedulesLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  standingsError: PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamsFail: PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(App);
