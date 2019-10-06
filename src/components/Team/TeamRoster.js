import React from "react";
import PropTypes from "prop-types";
import SortablePlayerTable from "../SortablePlayerTable";
import Card from "../Card";
import LoadingSpinner from "../LoadingSpinner";

const TeamRoster = ({ teamRosterError, teamRosterLoading, teamRoster }) => {
  if (teamRosterError) {
    return <div>Error! {teamRosterError.message}</div>;
  }

  if (teamRosterLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Card
      body={
        teamRoster && (
          <SortablePlayerTable
            players={teamRoster.filter(player => player.Status === "Active")}
          />
        )
      }
      style={{ position: "relative" }}
      title="Roster"
    />
  );
};

TeamRoster.propTypes = {
  teamRosterError: PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TeamRoster.defaultProps = {
  teamRosterError: null,
};

export default TeamRoster;
