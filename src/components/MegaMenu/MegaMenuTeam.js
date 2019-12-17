import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { espnLogo } from "../../utils/helpers";
import DropdownContext from "./DropdownContext";

const MegaMenuTeam = ({ Name, City, Key }) => {
  const { dispatch } = useContext(DropdownContext);
  return (
    <Link
      onClick={() => dispatch("toggle")}
      style={{ display: "block" }}
      to={`/teams/${Key}`}>
      <img alt={`${Name} ${City} Logo`} src={espnLogo(Key, 24)} />
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
