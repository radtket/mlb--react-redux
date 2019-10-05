import React from "react";
import PropTypes from "prop-types";
import TeamLogo from "./TeamLogo";

const TeamLogoBanner = ({ awayTeam, homeTeam }) => {
  return (
    <header>
      <figure className="away">
        <TeamLogo teamKey={awayTeam} />
      </figure>
      <figure className="home">
        <TeamLogo teamKey={homeTeam} />
      </figure>
    </header>
  );
};

TeamLogoBanner.propTypes = {
  awayTeam: PropTypes.string.isRequired,
  homeTeam: PropTypes.string.isRequired,
};

export default TeamLogoBanner;
