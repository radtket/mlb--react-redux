import React, { Component } from "react";
import PropTypes from "prop-types";
import TeamRoster from "../components/TeamRoster";
import TeamRecentGames from "../components/TeamRecentGames";
import TeamStandings from "../components/TeamStandings";

class TeamHome extends Component {
  render() {
    const {
      activeTeamObj,
      currentTeamAbrv,
      recentGames,
      standings,
      teamRoster,
      teamRosterError,
      teamRosterLoading,
    } = this.props;

    return (
      <div className="container">
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

TeamHome.propTypes = {
  activeTeamObj: PropTypes.shape({
    Name: PropTypes.string,
    City: PropTypes.string,
    Key: PropTypes.string,
    PrimaryColor: PropTypes.string,
  }).isRequired,
  recentGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TeamHome.defaultProps = {
  teamRosterError: null,
};

export default TeamHome;
