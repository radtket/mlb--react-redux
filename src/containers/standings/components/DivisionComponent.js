import React from "react";
import PropTypes from "prop-types";

const StandingsDivision = ({ division, divisionTeams }) => (
  <table className="table table-standings">
    <thead>
      <tr>
        <th>{division}</th>
        <th>W</th>
        <th>L</th>
        <th>PCT</th>
        <th>GB</th>
        <th>Home</th>
        <th>Road</th>
      </tr>
    </thead>
    <tbody>{divisionTeams}</tbody>
  </table>
);

StandingsDivision.propTypes = {
  division: PropTypes.string.isRequired,
  divisionTeams: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default StandingsDivision;
