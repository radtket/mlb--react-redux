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
          <th onClick={() => this.sortRoster("Name")}>Name</th>
          <th title="Games played" onClick={() => this.sortRoster("Games")}>
            GP
          </th>
          <th title="At bats" onClick={() => this.sortRoster("AtBats")}>
            AB
          </th>
          <th title="Runs" onClick={() => this.sortRoster("Runs")}>
            R
          </th>
          <th title="Hits" onClick={() => this.sortRoster("Hits")}>
            H
          </th>
          <th title="Doubles" onClick={() => this.sortRoster("Doubles")}>
            2B
          </th>
          <th title="Triples" onClick={() => this.sortRoster("Triples")}>
            3B
          </th>
          <th title="Home Runs" onClick={() => this.sortRoster("HomeRuns")}>
            HR
          </th>
          <th
            title="Runs Batted In"
            onClick={() => this.sortRoster("RunsBattedIn")}>
            RBI
          </th>
          <th title="Total Bases" onClick={() => this.sortRoster("TotalBases")}>
            TB
          </th>
          <th title="Walks" onClick={() => this.sortRoster("Walks")}>
            BB
          </th>
          <th title="Strikeouts" onClick={() => this.sortRoster("Strikeouts")}>
            SO
          </th>
          <th
            title="Stolen Bases"
            onClick={() => this.sortRoster("StolenBases")}>
            SB
          </th>
          <th
            title="Batting Average"
            onClick={() => this.sortRoster("BattingAverage")}>
            BA
          </th>
          <th
            title="On Base Percentage"
            onClick={() => this.sortRoster("OnBasePercentage")}>
            OBP
          </th>
          <th
            title="Slugging Percentage"
            onClick={() => this.sortRoster("SluggingPercentage")}>
            SLG
          </th>
          <th
            title="On Base Plus Slugging"
            onClick={() => this.sortRoster("OnBasePlusSlugging")}>
            OPS
          </th>
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
