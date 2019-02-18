import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { birthday } from "../../../../utils/helpers";

class RosterTable extends Component {
  state = { data: [], order: 1 };

  componentDidMount() {
    const { teamRoster } = this.props;
    this.setState({
      data: teamRoster
    });
  }

  isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  onSort = sortKey => {
    const { data, order } = this.state;
    data.sort((a, b) => {
      if (a[sortKey] === b[sortKey]) {
        return 0;
      }
      if (a[sortKey] === null) {
        return 1;
      }
      if (b[sortKey] === null) {
        return -1;
      }
      if (this.isNumber(a[sortKey]) && this.isNumber(b[sortKey])) {
        if (parseInt(a[sortKey], 10) === parseInt(b[sortKey], 10)) {
          return 0;
        }
        return parseInt(a[sortKey], 10) > parseInt(b[sortKey], 10) ? 1 : -1;
      }
      if (this.isNumber(a[sortKey])) {
        return -1;
      }
      if (this.isNumber(b[sortKey])) {
        return 1;
      }
      return a[sortKey].localeCompare(b[sortKey]);
    });
    this.setState({ data: order ? data : data.reverse(), order: !order });
  };

  render() {
    const { data: newdata } = this.state;

    return (
      <Table responsive>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th onClick={() => this.onSort("LastName")}>Name</th>
            <th onClick={() => this.onSort("Position")}>Position</th>
            <th onClick={() => this.onSort("BatHand")}>Bat</th>
            <th onClick={() => this.onSort("ThrowHand")}>Throw</th>
            <th onClick={() => this.onSort("BirthDate")}>Age</th>
            <th onClick={() => this.onSort("Height")}>Height</th>
            <th onClick={() => this.onSort("Weight")}>Weight</th>
            <th>Birthplace</th>
          </tr>
        </thead>
        <tbody>
          {newdata &&
            newdata.map(player => {
              const {
                PlayerID,
                FirstName,
                LastName,
                Jersey,
                Position,
                BatHand,
                ThrowHand,
                BirthDate,
                Height,
                Weight,
                BirthCity,
                BirthState
              } = player;
              return (
                <tr key={PlayerID}>
                  <td>
                    {FirstName} {LastName} <small>{Jersey}</small>
                  </td>
                  <td>{Position || "-"}</td>
                  <td>{BatHand || "-"}</td>
                  <td>{ThrowHand || "-"}</td>
                  <td>{birthday(BirthDate) || "-"}</td>
                  <td>{Height || "-"}</td>
                  <td>{Weight || "-"}</td>
                  <td>
                    {{ BirthCity } && { BirthState }
                      ? `${BirthCity}${
                          BirthState != null ? `, ${BirthState}` : ""
                        }`
                      : { BirthCity }}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}

RosterTable.propTypes = {
  teamRoster: PropTypes.arrayOf(
    PropTypes.shape({
      Position: PropTypes.string,
      FirstName: PropTypes.string,
      LastName: PropTypes.string,
      Jersey: PropTypes.string,
      BatHand: PropTypes.string,
      ThrowHand: PropTypes.string,
      BirthDate: PropTypes.string,
      Height: PropTypes.string,
      Weight: PropTypes.string,
      BirthCity: PropTypes.string
    })
  )
};

RosterTable.defaultProps = {
  teamRoster: PropTypes.arrayOf(
    PropTypes.shape({
      Position: "-",
      FirstName: "-",
      LastName: "-",
      Jersey: "-",
      BatHand: "-",
      ThrowHand: "-",
      BirthDate: "-",
      Height: "-",
      Weight: "-",
      BirthCity: "-"
    })
  )
};

export default RosterTable;
