import React from "react";
import PropTypes from "prop-types";
import DepthChartWrapper from "./DepthChartWrapper";

const DepthChart = ({ teamAbrv, positions, teamRoster }) => {
  return (
    <figure
      className="depth-chart"
      style={{
        backgroundImage: `url('/data/stadiums/${teamAbrv}.png')`,
      }}>
      <DepthChartWrapper {...{ positions, teamRoster }} />
    </figure>
  );
};

DepthChart.propTypes = {
  teamAbrv: PropTypes.string.isRequired,
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DepthChart;
