import React from "react";
import PropTypes from "prop-types";
import DepthChartWrapper from "./DepthChartWrapper";

const DepthChart = ({ TeamAbrv, positions, teamRoster }) => {
  return (
    <figure
      className="depth-chart"
      style={{
        backgroundImage: `url('/data/stadiums/${TeamAbrv}.png')`,
      }}>
      <DepthChartWrapper positions={positions} teamRoster={teamRoster} />
    </figure>
  );
};

DepthChart.propTypes = {
  TeamAbrv: PropTypes.string.isRequired,
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DepthChart;
