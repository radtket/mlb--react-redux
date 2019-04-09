import React from "react";
import PropTypes from "prop-types";
import TeamLogo from "./TeamLogo";
import { teamFinder } from "../../../utils/helpers";

const TeamLogoBanner = ({ awayTeam, homeTeam }) => {
  return (
    <header>
      <figure className="away">
        <TeamLogo Team={teamFinder[`${awayTeam}`]} Key={awayTeam} />
      </figure>
      <figure className="home">
        <TeamLogo Team={teamFinder[`${homeTeam}`]} Key={homeTeam} />
      </figure>
    </header>
  );
};

TeamLogoBanner.propTypes = {
  awayTeam: PropTypes.string.isRequired,
  homeTeam: PropTypes.string.isRequired,
};

export default TeamLogoBanner;
