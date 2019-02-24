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
          <th onClick={() => this.sortRoster("Position")}>POS</th>
          <th onClick={() => this.sortRoster("BatHand")}>BAT</th>
          <th onClick={() => this.sortRoster("ThrowHand")}>THW</th>
          <th onClick={() => this.sortRoster("BirthDate")}>AGE</th>
          <th onClick={() => this.sortRoster("Height")}>HT</th>
          <th onClick={() => this.sortRoster("Weight")}>WT</th>
          <th>Birth Place</th>
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
