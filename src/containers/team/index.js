import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamRoster } from "../../modules/teamRoster/actions";
import { fetchStandings } from "../../modules/standings/actions";
import TeamHeader from "./components/TeamHeader";
import TeamHome from "./pages";

class Team extends Component {
  state = {
    recentGames: [],
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
      teamRoster,
      teamRosterError,
      teamRosterLoading,
      teams,
    } = this.props;
    const { recentGames } = this.state;
    const { teamAbrv: currentTeamAbrv } = match.params;
    const activeTeamObj = this.getActiveTeamObj(teams, currentTeamAbrv);

    if (teamRosterError) {
      return <div>Error! {teamRosterError.message}</div>;
    }

    if (standingsError) {
      return <div>Error! {standingsError.message}</div>;
    }

    if (teamRosterLoading || standingsLoading || !activeTeamObj) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <TeamHeader
          {...activeTeamObj}
          teams={teams}
          changeTeams={this.changeTeams}
        />
        <TeamHome
          currentTeamAbrv={currentTeamAbrv}
          activeTeamObj={activeTeamObj}
          recentGames={recentGames}
          standings={standings}
          teamRoster={teamRoster}
          teamRosterError={teamRosterError}
          teamRosterLoading={teamRosterLoading}
        />
      </>
    );
  }
}

Team.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  fetchTeamRoster: PropTypes.func.isRequired,
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Team.defaultProps = {
  teamRosterError: null,
  standingsError: null,
};

const mapStateToProps = ({ teamRoster, standings }) => ({
  teamRoster: teamRoster.teamRosterData,
  teamRosterLoading: teamRoster.teamRosterLoading,
  teamRosterError: teamRoster.teamRosterError,
  standings: standings.standingsData,
  standingsLoading: standings.standingsLoading,
  standingsError: standings.standingsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamRoster,
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
