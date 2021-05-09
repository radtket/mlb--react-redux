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
        <th onClick={() => sortRosterStateBy("AtBats")} title="At bats">
          AB
        </th>
        <th onClick={() => sortRosterStateBy("Runs")} title="Runs">
          R
        </th>
        <th onClick={() => sortRosterStateBy("Hits")} title="Hits">
          H
        </th>
        <th onClick={() => sortRosterStateBy("Doubles")} title="Doubles">
          2B
        </th>
        <th onClick={() => sortRosterStateBy("Triples")} title="Triples">
          3B
        </th>
        <th onClick={() => sortRosterStateBy("HomeRuns")} title="Home Runs">
          HR
        </th>
        <th
          onClick={() => sortRosterStateBy("RunsBattedIn")}
          title="Runs Batted In"
        >
          RBI
        </th>
        <th onClick={() => sortRosterStateBy("TotalBases")} title="Total Bases">
          TB
        </th>
        <th onClick={() => sortRosterStateBy("Walks")} title="Walks">
          BB
        </th>
        <th onClick={() => sortRosterStateBy("Strikeouts")} title="Strikeouts">
          SO
        </th>
        <th
          onClick={() => sortRosterStateBy("StolenBases")}
          title="Stolen Bases"
        >
          SB
        </th>
        <th
          onClick={() => sortRosterStateBy("BattingAverage")}
          title="Batting Average"
        >
          BA
        </th>
        <th
          onClick={() => sortRosterStateBy("OnBasePercentage")}
          title="On Base Percentage"
        >
          OBP
        </th>
        <th
          onClick={() => sortRosterStateBy("SluggingPercentage")}
          title="Slugging Percentage"
        >
          SLG
        </th>
        <th
          onClick={() => sortRosterStateBy("OnBasePlusSlugging")}
          title="On Base Plus Slugging"
        >
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
