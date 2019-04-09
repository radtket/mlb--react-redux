import React from "react";
import PropTypes from "prop-types";
import { espnLogo } from "../../../utils/helpers";

const TeamLogo = ({ Team, Key }) => {
  const { Name, City, PrimaryColor } = Team;

  return (
    <div
      className="team__banner rendered"
      style={{ background: `${PrimaryColor}` }}>
      <figure className="team__banner__wrapper">
        <img src={espnLogo(Key, 208)} alt={`${Name} ${City} Logo`} />
      </figure>
    </div>
  );
};

TeamLogo.propTypes = {
  Team: PropTypes.shape({
    Name: PropTypes.string,
    City: PropTypes.string,

    PrimaryColor: PropTypes.string,
  }).isRequired,
  Key: PropTypes.string.isRequired,
};

export default TeamLogo;
