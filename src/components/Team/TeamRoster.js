import React, { Component } from "react";
import PropTypes from "prop-types";
import SortablePlayerTable from "../SortablePlayerTable";
import Card from "../Card";

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
      <Card
        title="Roster"
        body={
          teamRoster && (
            <SortablePlayerTable
              players={teamRoster.filter(player => player.Status === "Active")}
            />
          )
        }
        style={{ position: "relative" }}
      />
    );
  }
}

TeamRoster.propTypes = {
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TeamRoster.defaultProps = {
  teamRosterError: null,
};

export default TeamRoster;
