/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";
import Sort from "./Sort";
import Roster from "./Roster";

class SortablePlayerTable extends Component {
  state = {
    players: [],
    direction: 1,
    isScrolling: false,
  };

  componentDidMount() {
    const { players } = this.props;
    this.handleTableScroll();
    this.setState({
      players,
    });
  }

  handleTableScroll = () => {
    document.querySelector(".table--wrap").addEventListener("scroll", () => {
      const { isScrolling } = this.state;
      if (!isScrolling) {
        this.setState({ isScrolling: true });
        setTimeout(() => {
          this.setState({ isScrolling: false });
        }, 300);
      }
    });
  };

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
    const { players: StatePlayers, direction, isScrolling } = this.state;
    return (
      <div className={`table--wrap  ${isScrolling && "isScrolling"}`}>
        <table className="table table--roster">
          <Sort
            direction={direction}
            players={PropsPlayers}
            sortRosterStateBy={this.sortRosterStateBy}
          />
          <Roster players={StatePlayers} />
        </table>
      </div>
    );
  }
}

export default SortablePlayerTable;
