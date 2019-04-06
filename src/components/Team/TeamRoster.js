import React from "react";
import PropTypes from "prop-types";
import SortablePlayerTable from "../SortablePlayerTable";
import Card from "../Card";

const TeamRoster = ({ teamRosterError, teamRosterLoading, teamRoster }) => {
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
};

TeamRoster.propTypes = {
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TeamRoster.defaultProps = {
  teamRosterError: null,
};

export default TeamRoster;
