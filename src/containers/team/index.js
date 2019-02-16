import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TeamRoster from "./components/TeamRoster";
import TeamRecentGames from "./components/TeamRecentGames";
import { fetchTeamRoster } from "../../modules/teamRoster/actions";

class Team extends Component {
  state = {
    recentGames: []
  };

  componentDidMount() {
    const { schedules, match, fetchTeamRoster: getTeamRoster } = this.props;
    const { teamAbrv: currentTeamAbrv } = match.params;
    this.findTeamSchedule(schedules, currentTeamAbrv);
    getTeamRoster(currentTeamAbrv);
  }

  componentDidUpdate(prevProps) {
    const { match, schedules, fetchTeamRoster: getTeamRoster } = this.props;
    const { teamAbrv: currentTeamAbrv } = match.params;
    const { teamAbrv: prevTeamAbrv } = prevProps.match.params;

    if (currentTeamAbrv !== prevTeamAbrv) {
      this.findTeamSchedule(schedules, currentTeamAbrv);
      getTeamRoster(currentTeamAbrv);
    }
  }

  findTeamSchedule = (schedules, teamAbrv) => {
    return this.setState({
      recentGames: schedules
        .filter(team => {
          const { HomeTeam, AwayTeam, Status } = team;
          return (
            (HomeTeam === teamAbrv || AwayTeam === teamAbrv) &&
            Status !== "Scheduled"
          );
        })
        .reverse()
    });
  };

  render() {
    const {
      teamRosterError,
      teamRosterLoading,
      match,
      teamRoster
    } = this.props;
    const { recentGames } = this.state;
    const { teamAbrv: currentTeamAbrv } = match.params;

    if (teamRosterError) {
      return <div>Error! {teamRosterError.message}</div>;
    }

    if (teamRosterLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{currentTeamAbrv}</h1>
        <TeamRecentGames
          activeTeam={currentTeamAbrv}
          recentGames={recentGames}
        />
        <TeamRoster
          teamRoster={teamRoster}
          teamRosterError={teamRosterError}
          teamRosterLoading={teamRosterLoading}
        />
      </div>
    );
  }
}

Team.propTypes = {
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamAbrv: PropTypes.string.isRequired
    })
  }).isRequired,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      Status: PropTypes.string,
      AwayTeam: PropTypes.string,
      HomeTeam: PropTypes.string
    })
  ).isRequired,
  fetchTeamRoster: PropTypes.func.isRequired
};

Team.defaultProps = {
  teamRosterError: null
};

const mapStateToProps = ({ teamRoster }) => ({
  teamRoster: teamRoster.teamRosterData,
  teamRosterLoading: teamRoster.teamRosterLoading,
  teamRosterError: teamRoster.teamRosterError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamRoster
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Team);
