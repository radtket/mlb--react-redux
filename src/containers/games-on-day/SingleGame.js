import React from "react";
import PropTypes from "prop-types";
import "./styles/TeamLogo.scss";

const SingleGame = ({ AwayTeam, HomeTeam }) => {
  return (
    <li>
      {AwayTeam} vs {HomeTeam}
    </li>
  );
};

SingleGame.propTypes = {
  AwayTeam: PropTypes.string.isRequired,
  HomeTeam: PropTypes.string.isRequired,
};

export default SingleGame;
