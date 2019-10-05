import React from "react";
import PropTypes from "prop-types";
import { espnLogo, teamFinder } from "../../../utils/helpers";

const TeamLogo = ({ teamKey }) => {
  const { Name, City, PrimaryColor } = teamFinder[teamKey];

  return (
    <div
      className="team__banner rendered"
      style={{ background: `${PrimaryColor}` }}>
      <figure className="team__banner__wrapper">
        <img alt={`${Name} ${City} Logo`} src={espnLogo(teamKey, 208)} />
      </figure>
    </div>
  );
};

TeamLogo.propTypes = {
  teamKey: PropTypes.string,
};

TeamLogo.defaultProps = {
  teamKey: "MIL",
};

export default TeamLogo;
