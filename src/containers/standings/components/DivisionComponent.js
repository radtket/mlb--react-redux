import React from "react";
import PropTypes from "prop-types";

const StandingsDivision = ({ division, divisionTeams }) => (
  <table
    className="table table--standings"
    style={{
      margin: "24px auto",
      boxShadow:
        "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
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
