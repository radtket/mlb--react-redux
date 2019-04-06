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
        <th title="At bats" onClick={() => sortRoster("AtBats")}>
          AB
        </th>
        <th title="Runs" onClick={() => sortRoster("Runs")}>
          R
        </th>
        <th title="Hits" onClick={() => sortRoster("Hits")}>
          H
        </th>
        <th title="Doubles" onClick={() => sortRoster("Doubles")}>
          2B
        </th>
        <th title="Triples" onClick={() => sortRoster("Triples")}>
          3B
        </th>
        <th title="Home Runs" onClick={() => sortRoster("HomeRuns")}>
          HR
        </th>
        <th title="Runs Batted In" onClick={() => sortRoster("RunsBattedIn")}>
          RBI
        </th>
        <th title="Total Bases" onClick={() => sortRoster("TotalBases")}>
          TB
        </th>
        <th title="Walks" onClick={() => sortRoster("Walks")}>
          BB
        </th>
        <th title="Strikeouts" onClick={() => sortRoster("Strikeouts")}>
          SO
        </th>
        <th title="Stolen Bases" onClick={() => sortRoster("StolenBases")}>
          SB
        </th>
        <th
          title="Batting Average"
          onClick={() => sortRoster("BattingAverage")}>
          BA
        </th>
        <th
          title="On Base Percentage"
          onClick={() => sortRoster("OnBasePercentage")}>
          OBP
        </th>
        <th
          title="Slugging Percentage"
          onClick={() => sortRoster("SluggingPercentage")}>
          SLG
        </th>
        <th
          title="On Base Plus Slugging"
          onClick={() => sortRoster("OnBasePlusSlugging")}>
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
