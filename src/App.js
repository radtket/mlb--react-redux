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
  NewsAllTeamsList,
  PlayerList,
  ProductList,
  LeagueLeadersList,
  RedditAsyncApp,
  SchedulesList,
  StandingsList,
  Team,
} from "./pages";

// Actions
import { fetchTeams, fetchSchedules, fetchStandings } from "./modules/actions";

// Components
import Navbar from "./components/Navbar";

const App = ({
  standingsError,
  standingsLoading,
  schedulesError,
  schedulesLoading,
  schedules,
  teamsFail,
  teamsLoading,
  teams,
  fetchTeams: getTeams,
  fetchSchedules: getSchedules,
  fetchStandings: getStandings,
}) => {
  useEffect(() => {
    getTeams();
    getSchedules(2019);
    getStandings();
  }, []);

  if (teamsFail) {
    return <div>Error! {teamsFail.message}</div>;
  }

  if (schedulesError) {
    return <div>Error! {schedulesError.message}</div>;
  }

  if (standingsError) {
    return <div>Error! {standingsError.message}</div>;
  }

  if (teamsLoading || schedulesLoading || standingsLoading) {
    return <div className="loadingBar" />;
  }

  return (
    <div>
      <Navbar teams={teams} />
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/counter" component={Counters} />
        <Route exact path="/news" component={NewsAllTeamsList} />
        <Route exact path="/product" component={ProductList} />
        <Route exact path="/leaders" component={LeagueLeadersList} />
        <Route exact path="/player/:playerArg" component={PlayerList} />
        <Route exact path="/reddit" component={RedditAsyncApp} />
        <Route exact path="/scores" component={GamesOnDayList} />
        <Route exact path="/schedules" component={SchedulesList} />
        <Route exact path="/standings" component={StandingsList} />
        <Route
          path="/teams/:teamAbrv"
          render={props => (
            <Team {...props} teams={teams} schedules={schedules} />
          )}
        />
      </main>
    </div>
  );
};

App.propTypes = {
  teamsFail: null || PropTypes.bool,
  teamsLoading: PropTypes.bool.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeams: PropTypes.func.isRequired,
  schedulesError: null || PropTypes.bool,
  schedulesLoading: PropTypes.bool.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchSchedules: PropTypes.func.isRequired,
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchStandings: PropTypes.func.isRequired,
};

App.defaultProps = {
  teamsFail: null,
  schedulesError: null,
  standingsError: null,
};

const mapStateToProps = ({ teams, schedules, standings }) => ({
  teams: teams.teamsData,
  teamsLoading: teams.teamsLoading,
  teamsFail: teams.teamsFail,
  schedules: schedules.schedulesData,
  schedulesLoading: schedules.schedulesLoading,
  schedulesError: schedules.schedulesError,
  standings: standings.standingsData,
  standingsLoading: standings.standingsLoading,
  standingsError: standings.standingsError,
});

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
