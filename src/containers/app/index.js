import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Home from "../home";
import RedditAsyncApp from "../reddit";
import ProductList from "../product";
import SchedulesList from "../schedules";
import NewsAllTeamsList from "../newsAllTeams";
import StandingsList from "../standings";
import Team from "../team";
import { fetchTeams } from "../../modules/teams/actions";
import Header from "../../components/Header";

class App extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchTeams();
  }

  render() {
    const { error, loading, teams } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header teams={teams} />
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/reddit" component={RedditAsyncApp} />
          <Route exact path="/standings" component={StandingsList} />
          <Route exact path="/product" component={ProductList} />
          <Route exact path="/schedules" component={SchedulesList} />
          <Route exact path="/news" component={NewsAllTeamsList} />
          <Route path="/teams/:teamAbrv" component={Team} />
        </main>
      </div>
    );
  }
}

App.propTypes = {
  error: null || PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeams: PropTypes.func.isRequired
};

App.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  teams: state.teams.teamsData,
  loading: state.teams.loading,
  error: state.teams.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeams
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(App);
