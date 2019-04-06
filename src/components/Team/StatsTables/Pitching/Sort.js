import React from "react";
import PropTypes from "prop-types";

const Sort = ({ sortRosterStateBy, players, direction }) => {
  const sortRoster = field => {
    return sortRosterStateBy(field, players, direction);
  };

  return (
    <thead>
      <tr>
        <th onClick={() => sortRoster("Name")}>Name</th>
        <th title="Games played" onClick={() => sortRoster("Games")}>
          GP
        </th>
        <th title="Games started" onClick={() => sortRoster("Started")}>
          GS
        </th>
        <th title="Quality Starts" onClick={() => sortRoster("")}>
          QS
        </th>
        <th title="Wins" onClick={() => sortRoster("Wins")}>
          W
        </th>
        <th title="Losses" onClick={() => sortRoster("Losses")}>
          L
        </th>
        <th title="Saves" onClick={() => sortRoster("Saves")}>
          SV
        </th>
        <th title="Holds" onClick={() => sortRoster("PitchingHolds")}>
          HLD
        </th>
        <th
          title="Innings pitched"
          onClick={() => sortRoster("InningsPitchedFull")}>
          IP
        </th>
        <th title="Hits" onClick={() => sortRoster("PitchingHits")}>
          H
        </th>
        <th
          title="Earned runs"
          onClick={() => sortRoster("PitchingEarnedRuns")}>
          ER
        </th>
        <th title="Home runs" onClick={() => sortRoster("PitchingHomeRuns")}>
          HR
        </th>
        <th title="Walks" onClick={() => sortRoster("PitchingWalks")}>
          BB
        </th>
        <th title="Strikeouts" onClick={() => sortRoster("PitchingStrikeouts")}>
          SO
        </th>
        <th
          title="Strikeouts per 9 innings"
          onClick={() => sortRoster("PitchingStrikeoutsPerNineInnings")}>
          K/9
        </th>
        <th
          title="Walks + Hits per Inning pitched"
          onClick={() => sortRoster("")}>
          WHIP
        </th>
        <th
          title="Earned run average"
          onClick={() => sortRoster("EarnedRunAverage")}>
          ERA
        </th>
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
