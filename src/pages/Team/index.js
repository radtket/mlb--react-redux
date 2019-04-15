import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStandings } from "../../modules/actions";
import TeamHeader from "../../components/Team/TeamHeader";
import {
  PageTeamDepth,
  PageTeamHome,
  PageTeamRoster,
  PageTeamSchedule,
  PageTeamStats,
  PageTeamTickets,
} from "./sub-pages";
import TeamTheme from "./TeamTheme";
import LoadingSpinner from "../../components/LoadingSpinner";

class Team extends Component {
  state = {
    recentGames: [],
  };

  componentDidMount() {
    const { schedules, match } = this.props;
    const { teamAbrv: currentTeamAbrv } = match.params;
    this.findTeamSchedule(schedules, currentTeamAbrv);
  }

  componentDidUpdate(prevProps) {
    const { match, schedules } = this.props;
    const { teamAbrv: currentTeamAbrv } = match.params;
    const { teamAbrv: prevTeamAbrv } = prevProps.match.params;

    if (currentTeamAbrv !== prevTeamAbrv) {
      this.findTeamSchedule(schedules, currentTeamAbrv);
    }
  }

  findTeamSchedule = (schedules, teamAbrv) => {
    return this.setState({
      recentGames: schedules
        .filter(team => {
          const { HomeTeam, AwayTeam } = team;
          return (
            HomeTeam === teamAbrv || AwayTeam === teamAbrv
            // && team.Status !== "Scheduled"
          );
        })
        .reverse(),
    });
  };

  getActiveTeamObj = (teams, activeTeam) => {
    return teams.find(team => team.Key === activeTeam);
  };

  changeTeams = e => {
    const { history } = this.props;
    history.push(`/teams/${e.value}`);
  };

  render() {
    const {
      match,
      standings,
      standingsError,
      standingsLoading,
      teams,
    } = this.props;
    const { recentGames } = this.state;
    const { teamAbrv: currentTeamAbrv } = match.params;
    const activeTeamObj = this.getActiveTeamObj(teams, currentTeamAbrv);

    if (standingsError) {
      return <div>Error! {standingsError.message}</div>;
    }

    if (standingsLoading || !activeTeamObj) {
      return <LoadingSpinner />;
    }

    return (
      <>
        <TeamTheme {...activeTeamObj}>
          <TeamHeader
            {...activeTeamObj}
            teams={teams}
            changeTeams={this.changeTeams}
          />
        </TeamTheme>
        <Route
          exact
          path="/teams/:teamAbrv"
          render={() => (
            <TeamTheme {...activeTeamObj}>
              <PageTeamHome
                activeTeamObj={activeTeamObj}
                currentTeamAbrv={currentTeamAbrv}
                recentGames={recentGames}
                standings={standings}
                match={match}
              />
            </TeamTheme>
          )}
        />
        <Route
          exact
          path="/teams/:teamAbrv/roster"
          render={() => (
            <TeamTheme {...activeTeamObj}>
              <PageTeamRoster
                {...activeTeamObj}
                match={match}
                currentTeamAbrv={currentTeamAbrv}
              />
            </TeamTheme>
          )}
        />
        <Route
          exact
          path="/teams/:teamAbrv/stats"
          render={() => (
            <TeamTheme {...activeTeamObj}>
              <PageTeamStats match={match} />
            </TeamTheme>
          )}
        />
        <Route
          exact
          path="/teams/:teamAbrv/depth"
          render={() => (
            <TeamTheme {...activeTeamObj}>
              <PageTeamDepth
                {...activeTeamObj}
                currentTeamAbrv={currentTeamAbrv}
              />
            </TeamTheme>
          )}
        />
        <Route
          exact
          path="/teams/:teamAbrv/schedule"
          render={() => (
            <TeamTheme {...activeTeamObj}>
              <PageTeamSchedule
                currentTeamAbrv={currentTeamAbrv}
                schedule={recentGames}
              />
            </TeamTheme>
          )}
        />
        <Route
          exact
          path="/teams/:teamAbrv/tickets"
          render={() => (
            <TeamTheme {...activeTeamObj}>
              <PageTeamTickets {...activeTeamObj} />
            </TeamTheme>
          )}
        />
      </>
    );
  }
}

Team.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamAbrv: PropTypes.string.isRequired,
    }),
  }).isRequired,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      Status: PropTypes.string,
      AwayTeam: PropTypes.string,
      HomeTeam: PropTypes.string,
    })
  ).isRequired,
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Team.defaultProps = {
  standingsError: null,
};

const mapStateToProps = ({ standings }) => ({
  standings: standings.standingsData,
  standingsLoading: standings.standingsLoading,
  standingsError: standings.standingsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStandings,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Team);
