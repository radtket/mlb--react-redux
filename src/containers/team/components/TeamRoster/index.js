import React, { Component } from "react";
import PropTypes from "prop-types";
import PlayerListItem from "./PlayerListItem";

class TeamRoster extends Component {
  render() {
    const { teamRosterError, teamRosterLoading, teamRoster } = this.props;

    if (teamRosterError) {
      return <div>Error! {teamRosterError.message}</div>;
    }

    if (teamRosterLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Team Roster</h1>
        <ul>
          {teamRoster &&
            teamRoster.map(player => {
              const { PlayerID } = player;
              return <PlayerListItem key={PlayerID} {...player} />;
            })}
        </ul>
      </div>
    );
  }
}

TeamRoster.propTypes = {
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired
};

TeamRoster.defaultProps = {
  teamRosterError: null
};

export default TeamRoster;
