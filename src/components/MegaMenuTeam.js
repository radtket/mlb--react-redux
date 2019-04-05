import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { espnLogo } from "../utils/helpers";

const MegaMenuTeam = ({ Name, City, Key }) => {
  return (
    <Link to={`/teams/${Key}`} style={{ display: "block" }}>
      <img src={espnLogo(Key, 24)} alt={`${Name} ${City} Logo`} />
      <span>
        <span className="team-city">{City} </span>
        {Name}
      </span>
    </Link>
  );
};

MegaMenuTeam.propTypes = {
  Name: PropTypes.string.isRequired,
  City: PropTypes.string.isRequired,
  Key: PropTypes.string.isRequired,
};

export default MegaMenuTeam;
