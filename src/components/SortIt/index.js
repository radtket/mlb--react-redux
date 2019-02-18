/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { birthday, inchesToFeet } from "../../utils/helpers";

const ProfileCard = ({ player }) => {
  const {
    PhotoUrl,
    FirstName,
    LastName,
    Position,
    BatHand,
    Jersey,
    ThrowHand,
    Height,
    Weight,
    BirthDate,
    BirthCity,
    BirthState
  } = player;
  return (
    <tr>
      <td>
        <img src={PhotoUrl} alt={`${FirstName} ${LastName}`} />
      </td>
      <td>
        {FirstName} {LastName}
        <small> {typeof Jersey === "number" ? Jersey : ""}</small>
      </td>
      <td>{Position}</td>
      <td>{BatHand}</td>
      <td>{ThrowHand}</td>
      <td>{birthday(BirthDate)}</td>
      <td>{inchesToFeet(Height)}</td>
      <td>{Weight}</td>
      <td>
        {{ BirthCity } && { BirthState }
          ? `${BirthCity}${BirthState !== null ? `, ${BirthState}` : ""}`
          : { BirthCity }}
      </td>
    </tr>
  );
};

class Roster extends Component {
  render() {
    const { players } = this.props;
    const cards = [];
    players.forEach((player, i) => {
      const { PlayerID, LastName } = player;
      return cards.push(
        <ProfileCard key={PlayerID || LastName || i} player={player} />
      );
    });

    return <tbody>{cards}</tbody>;
  }
}

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
          <th onClick={this.sortRoster.bind(this, "LastName")}>Name</th>
          <th onClick={this.sortRoster.bind(this, "Position")}>Position</th>
          <th onClick={this.sortRoster.bind(this, "BatHand")}>Bat</th>
          <th onClick={this.sortRoster.bind(this, "ThrowHand")}>Throw</th>
          <th onClick={this.sortRoster.bind(this, "BirthDate")}>Age</th>
          <th onClick={this.sortRoster.bind(this, "Height")}>Height</th>
          <th onClick={this.sortRoster.bind(this, "Weight")}>Weight</th>
          <th>Birthplace</th>
        </tr>
      </thead>
    );
  }
}

class SortablePlayerTable extends Component {
  state = {
    players: this.props.players, // default state
    direction: 1
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
      // if (direction) {
      //   return a[field] < b[field] ? -1 : 1;
      // }
      // if (!direction) {
      //   return a[field] < b[field] ? 1 : -1;
      // }
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
