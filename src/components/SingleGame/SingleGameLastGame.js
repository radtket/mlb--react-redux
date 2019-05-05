import React from "react";
import PropTypes from "prop-types";

const SingleGameLastGame = ({ LastPlay }) => {
  return (
    <p className="last-play">
      <span className="title">Last Play:</span>
      <span className="text">{LastPlay}</span>
    </p>
  );
};

SingleGameLastGame.propTypes = {
  LastPlay: PropTypes.string,
};

SingleGameLastGame.defaultProps = {
  LastPlay: null,
};

export default SingleGameLastGame;
