import React, { Component } from "react";
import PropTypes from "prop-types";
import RosterTable from "./RosterTable";
import SortablePlayerTable from "../../../../components/SortablePlayerTable";

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
        {teamRoster && (
          <SortablePlayerTable
            players={teamRoster.filter(player => player.Status === "Active")}
          />
        )}
        {teamRoster && (
          <RosterTable
            teamRoster={teamRoster.filter(player => player.Status === "Active")}
          />
        )}
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
