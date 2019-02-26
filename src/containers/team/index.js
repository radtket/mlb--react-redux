import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TeamRoster from "./components/TeamRoster";
import TeamRecentGames from "./components/TeamRecentGames";
import { fetchTeamRoster } from "../../modules/teamRoster/actions";
import { fetchStandings } from "../../modules/standings/actions";
import TeamStandings from "./components/TeamStandings";

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

  render() {
    const {
      teamRosterError,
      teamRosterLoading,
      match,
      teams,
      teamRoster,
      standings,
      standingsError,
      standingsLoading,
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
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <h1>{currentTeamAbrv}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <TeamRoster
              teamRoster={teamRoster}
              teamRosterError={teamRosterError}
              teamRosterLoading={teamRosterLoading}
            />
          </div>
          <div className="col-sm-4">
            <TeamStandings
              activeTeam={currentTeamAbrv}
              activeTeamObj={activeTeamObj}
              standings={standings}
            />
            <TeamRecentGames
              activeTeam={currentTeamAbrv}
              recentGames={recentGames}
            />
          </div>
        </div>
      </div>
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
