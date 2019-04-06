import React from "react";
import PropTypes from "prop-types";

const Sort = ({ sortRosterStateBy, players, direction }) => {
  const sortRoster = field => {
    return sortRosterStateBy(field, players, direction);
  };

  return (
    <thead>
      <tr>
        <th onClick={() => sortRoster("LastName")}>Name</th>
        <th onClick={() => sortRoster("Position")}>POS</th>
        <th onClick={() => sortRoster("BatHand")}>BAT</th>
        <th onClick={() => sortRoster("ThrowHand")}>THW</th>
        <th onClick={() => sortRoster("BirthDate")}>AGE</th>
        <th onClick={() => sortRoster("Height")}>HT</th>
        <th onClick={() => sortRoster("Weight")}>WT</th>
        <th>Birth Place</th>
      </tr>
    </thead>
  );
};

Sort.propTypes = {
  sortRosterStateBy: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  direction: PropTypes.number.isRequired,
};

export default Sort;
