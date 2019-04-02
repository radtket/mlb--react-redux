import React from "react";
import PropTypes from "prop-types";

const StandingsDivision = ({ division, divisionTeams }) => (
  <table
    className="table table--standings"
    style={{
      margin: "24px auto",
    }}>
    <thead>
      <tr>
        <th>{division}</th>
        <th>W</th>
        <th>L</th>
        <th>PCT</th>
        <th>GB</th>
        <th className="standings__sec-stat">Home</th>
        <th className="standings__sec-stat">Road</th>
      </tr>
    </thead>
    <tbody>{divisionTeams}</tbody>
  </table>
);

StandingsDivision.propTypes = {
  division: PropTypes.string.isRequired,
  divisionTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StandingsDivision;
