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
          <th title="Games started" onClick={() => this.sortRoster("Started")}>
            GS
          </th>
          <th title="Quality Starts" onClick={() => this.sortRoster("")}>
            QS
          </th>
          <th title="Wins" onClick={() => this.sortRoster("Wins")}>
            W
          </th>
          <th title="Losses" onClick={() => this.sortRoster("Losses")}>
            L
          </th>
          <th title="Saves" onClick={() => this.sortRoster("Saves")}>
            SV
          </th>
          <th title="Holds" onClick={() => this.sortRoster("PitchingHolds")}>
            HLD
          </th>
          <th
            title="Innings pitched"
            onClick={() => this.sortRoster("InningsPitchedFull")}>
            IP
          </th>
          <th title="Hits" onClick={() => this.sortRoster("PitchingHits")}>
            H
          </th>
          <th
            title="Earned runs"
            onClick={() => this.sortRoster("PitchingEarnedRuns")}>
            ER
          </th>
          <th
            title="Home runs"
            onClick={() => this.sortRoster("PitchingHomeRuns")}>
            HR
          </th>
          <th title="Walks" onClick={() => this.sortRoster("PitchingWalks")}>
            BB
          </th>
          <th
            title="Strikeouts"
            onClick={() => this.sortRoster("PitchingStrikeouts")}>
            SO
          </th>
          <th
            title="Strikeouts per 9 innings"
            onClick={() => this.sortRoster("PitchingStrikeoutsPerNineInnings")}>
            K/9
          </th>
          <th
            title="Walks + Hits per Inning pitched"
            onClick={() => this.sortRoster("")}>
            WHIP
          </th>
          <th
            title="Earned run average"
            onClick={() => this.sortRoster("EarnedRunAverage")}>
            ERA
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
