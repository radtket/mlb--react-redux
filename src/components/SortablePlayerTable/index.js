/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Sort from "./Sort";
import Roster from "./Roster";

class SortablePlayerTable extends Component {
  state = {
    players: [],
    direction: 1
  };

  componentDidMount() {
    const { players } = this.props;
    this.setState({
      players
    });
  }

  sortRosterStateBy = (field, players, direction) => {
    players.sort((a, b) => {
      if (a[field] === null) {
        return 1;
      }
      if (b[field] === null) {
        return -1;
      }
      if (a[field] === b[field]) {
        return 0;
      }
      if (a[field] > b[field]) {
        return -direction;
      }
      if (a[field] < b[field]) {
        return direction;
      }
      return 0;
    });

    // Change state
    this.setState({ players, direction: -direction });
  };

  render() {
    // Return page with stats data and Roster
    const { players: PropsPlayers } = this.props;
    const { players: StatePlayers, direction } = this.state;

    return (
      <Table>
        <Sort
          direction={direction}
          players={PropsPlayers}
          sortRosterStateBy={this.sortRosterStateBy}
        />
        <Roster players={StatePlayers} />
      </Table>
    );
  }
}

export default SortablePlayerTable;
