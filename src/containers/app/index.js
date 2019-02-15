import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

// Pages
import Home from "../home";
import RedditAsyncApp from "../reddit";
import ProductList from "../product";
import SchedulesList from "../schedules";
import NewsAllTeamsList from "../newsAllTeams";
import StandingsList from "../standings";
import Team from "../team";

// Actions
import { fetchTeams } from "../../modules/teams/actions";
import { fetchSchedules } from "../../modules/schedules/actions";
import { fetchStandings } from "../../modules/standings/actions";

// Components
import Header from "../../components/Header";

class App extends Component {
  componentDidMount() {
    /* eslint-disable react/destructuring-assignment */
    this.props.fetchTeams();
    this.props.fetchSchedules();
    this.props.fetchStandings();
    /* eslint-enable react/destructuring-assignment */
  }

  render() {
    const {
      standingsError,
      standingsLoading,
      schedulesError,
      schedulesLoading,
      schedules,
      teamsFail,
      teamsLoading,
      teams
    } = this.props;

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
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header teams={teams} />
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/news" component={NewsAllTeamsList} />
          <Route exact path="/product" component={ProductList} />
          <Route exact path="/reddit" component={RedditAsyncApp} />
          <Route exact path="/scores" component={SchedulesList} />
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
  }
}

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
  fetchStandings: PropTypes.func.isRequired
};

App.defaultProps = {
  teamsFail: null,
  schedulesError: null,
  standingsError: null
};

const mapStateToProps = state => ({
  teams: state.teams.teamsData,
  teamsLoading: state.teams.teamsLoading,
  teamsFail: state.teams.teamsFail,
  schedules: state.schedules.schedulesData,
  schedulesLoading: state.schedules.schedulesLoading,
  schedulesError: state.schedules.schedulesError,
  standings: state.standings.standingsData,
  standingsLoading: state.standings.standingsLoading,
  standingsError: state.standings.standingsError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeams,
      fetchSchedules,
      fetchStandings
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(App);
