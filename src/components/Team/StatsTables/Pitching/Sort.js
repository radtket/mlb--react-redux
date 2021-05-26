import React from "react";
import PropTypes from "prop-types";

const Sort = ({ sortRosterStateBy }) => {
  return (
    <thead>
      <tr>
        <th onClick={() => sortRosterStateBy("Name")}>Name</th>
        <th onClick={() => sortRosterStateBy("Games")} title="Games played">
          GP
        </th>
        <th onClick={() => sortRosterStateBy("Started")} title="Games started">
          GS
        </th>
        <th onClick={() => sortRosterStateBy("")} title="Quality Starts">
          QS
        </th>
        <th onClick={() => sortRosterStateBy("Wins")} title="Wins">
          W
        </th>
        <th onClick={() => sortRosterStateBy("Losses")} title="Losses">
          L
        </th>
        <th onClick={() => sortRosterStateBy("Saves")} title="Saves">
          SV
        </th>
        <th onClick={() => sortRosterStateBy("PitchingHolds")} title="Holds">
          HLD
        </th>
        <th
          onClick={() => sortRosterStateBy("InningsPitchedFull")}
          title="Innings pitched"
        >
          IP
        </th>
        <th onClick={() => sortRosterStateBy("PitchingHits")} title="Hits">
          H
        </th>
        <th
          onClick={() => sortRosterStateBy("PitchingEarnedRuns")}
          title="Earned runs"
        >
          ER
        </th>
        <th
          onClick={() => sortRosterStateBy("PitchingHomeRuns")}
          title="Home runs"
        >
          HR
        </th>
        <th onClick={() => sortRosterStateBy("PitchingWalks")} title="Walks">
          BB
        </th>
        <th
          onClick={() => sortRosterStateBy("PitchingStrikeouts")}
          title="Strikeouts"
        >
          SO
        </th>
        <th
          onClick={() => sortRosterStateBy("PitchingStrikeoutsPerNineInnings")}
          title="Strikeouts per 9 innings"
        >
          K/9
        </th>
        <th
          onClick={() => sortRosterStateBy("")}
          title="Walks + Hits per Inning pitched"
        >
          WHIP
        </th>
        <th
          onClick={() => sortRosterStateBy("EarnedRunAverage")}
          title="Earned run average"
        >
          ERA
        </th>
      </tr>
    </thead>
  );
};

Sort.propTypes = {
  sortRosterStateBy: PropTypes.func.isRequired,
};

export default Sort;
