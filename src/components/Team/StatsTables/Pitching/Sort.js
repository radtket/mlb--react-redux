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
        <th onClick={() => sortRoster("Games")} title="Games played">
          GP
        </th>
        <th onClick={() => sortRoster("Started")} title="Games started">
          GS
        </th>
        <th onClick={() => sortRoster("")} title="Quality Starts">
          QS
        </th>
        <th onClick={() => sortRoster("Wins")} title="Wins">
          W
        </th>
        <th onClick={() => sortRoster("Losses")} title="Losses">
          L
        </th>
        <th onClick={() => sortRoster("Saves")} title="Saves">
          SV
        </th>
        <th onClick={() => sortRoster("PitchingHolds")} title="Holds">
          HLD
        </th>
        <th
          onClick={() => sortRoster("InningsPitchedFull")}
          title="Innings pitched">
          IP
        </th>
        <th onClick={() => sortRoster("PitchingHits")} title="Hits">
          H
        </th>
        <th
          onClick={() => sortRoster("PitchingEarnedRuns")}
          title="Earned runs">
          ER
        </th>
        <th onClick={() => sortRoster("PitchingHomeRuns")} title="Home runs">
          HR
        </th>
        <th onClick={() => sortRoster("PitchingWalks")} title="Walks">
          BB
        </th>
        <th onClick={() => sortRoster("PitchingStrikeouts")} title="Strikeouts">
          SO
        </th>
        <th
          onClick={() => sortRoster("PitchingStrikeoutsPerNineInnings")}
          title="Strikeouts per 9 innings">
          K/9
        </th>
        <th
          onClick={() => sortRoster("")}
          title="Walks + Hits per Inning pitched">
          WHIP
        </th>
        <th
          onClick={() => sortRoster("EarnedRunAverage")}
          title="Earned run average">
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
