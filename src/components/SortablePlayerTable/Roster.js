import React from "react";
import PropTypes from "prop-types";
import ProfileCard from "./ProfileCard";

const Roster = ({ players }) => {
  return (
    <tbody>
      {players &&
        players.map((player, i) => {
          const { PlayerID, LastName } = player;
          return <ProfileCard key={PlayerID || LastName || i} {...player} />;
        })}
    </tbody>
  );
};

Roster.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Roster;
