import React, { Component } from "react";
import PropTypes from "prop-types";

class Sort extends Component {
  sortRoster = field => {
    const { sortRosterStateBy, players, direction } = this.props;
    return sortRosterStateBy(field, players, direction);
  };

  render() {
    return (
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th
            onClick={() => this.sortRoster("LastName")}
            style={{ textAlign: "left" }}>
            Name
          </th>
          <th onClick={() => this.sortRoster("Position")}>Position</th>
          <th onClick={() => this.sortRoster("BatHand")}>Bat</th>
          <th onClick={() => this.sortRoster("ThrowHand")}>Throw</th>
          <th onClick={() => this.sortRoster("BirthDate")}>Age</th>
          <th onClick={() => this.sortRoster("Height")}>Height</th>
          <th onClick={() => this.sortRoster("Weight")}>Weight</th>
          <th>Birthplace</th>
        </tr>
      </thead>
    );
  }
}

Sort.propTypes = {
  sortRosterStateBy: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  direction: PropTypes.number.isRequired,
};

export default Sort;
