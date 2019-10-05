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
        <th onClick={() => sortRoster("AtBats")} title="At bats">
          AB
        </th>
        <th onClick={() => sortRoster("Runs")} title="Runs">
          R
        </th>
        <th onClick={() => sortRoster("Hits")} title="Hits">
          H
        </th>
        <th onClick={() => sortRoster("Doubles")} title="Doubles">
          2B
        </th>
        <th onClick={() => sortRoster("Triples")} title="Triples">
          3B
        </th>
        <th onClick={() => sortRoster("HomeRuns")} title="Home Runs">
          HR
        </th>
        <th onClick={() => sortRoster("RunsBattedIn")} title="Runs Batted In">
          RBI
        </th>
        <th onClick={() => sortRoster("TotalBases")} title="Total Bases">
          TB
        </th>
        <th onClick={() => sortRoster("Walks")} title="Walks">
          BB
        </th>
        <th onClick={() => sortRoster("Strikeouts")} title="Strikeouts">
          SO
        </th>
        <th onClick={() => sortRoster("StolenBases")} title="Stolen Bases">
          SB
        </th>
        <th
          onClick={() => sortRoster("BattingAverage")}
          title="Batting Average">
          BA
        </th>
        <th
          onClick={() => sortRoster("OnBasePercentage")}
          title="On Base Percentage">
          OBP
        </th>
        <th
          onClick={() => sortRoster("SluggingPercentage")}
          title="Slugging Percentage">
          SLG
        </th>
        <th
          onClick={() => sortRoster("OnBasePlusSlugging")}
          title="On Base Plus Slugging">
          OPS
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
