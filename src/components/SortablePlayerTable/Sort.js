import React from "react";
import PropTypes from "prop-types";

const Sort = ({ sortRosterStateBy }) => {
  return (
    <thead>
      <tr>
        <th onClick={() => sortRosterStateBy("LastName")}>Name</th>
        <th onClick={() => sortRosterStateBy("Position")}>POS</th>
        <th onClick={() => sortRosterStateBy("BatHand")}>BAT</th>
        <th onClick={() => sortRosterStateBy("ThrowHand")}>THW</th>
        <th onClick={() => sortRosterStateBy("BirthDate")}>AGE</th>
        <th onClick={() => sortRosterStateBy("Height")}>HT</th>
        <th onClick={() => sortRosterStateBy("Weight")}>WT</th>
        <th>Birth Place</th>
      </tr>
    </thead>
  );
};

Sort.propTypes = {
  sortRosterStateBy: PropTypes.func.isRequired,
};

export default Sort;
