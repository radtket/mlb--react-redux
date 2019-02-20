import React from "react";
import PropTypes from "prop-types";

const SingleGame = ({ AwayTeam, HomeTeam, activeTeam }) => {
  return (
    <li>
      {AwayTeam} {activeTeam === HomeTeam ? "vs" : "@"} {HomeTeam}
    </li>
  );
};

SingleGame.propTypes = {
  AwayTeam: PropTypes.string.isRequired,
  HomeTeam: PropTypes.string.isRequired,
  activeTeam: PropTypes.string.isRequired,
};

export default SingleGame;
