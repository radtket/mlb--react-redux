import React from "react";
import PropTypes from "prop-types";
import DepthChartWrapper from "./DepthChartWrapper";

const DepthChart = ({
  TeamAbrv,
  positions,
  teamRoster,
  PrimaryColor,
  QuaternaryColor,
  SecondaryColor,
}) => {
  return (
    <figure
      className="depth-chart"
      style={{
        backgroundImage: `url('/data/stadiums/${TeamAbrv}.png')`,
      }}>
      <DepthChartWrapper
        positions={positions}
        teamRoster={teamRoster}
        PrimaryColor={PrimaryColor}
        QuaternaryColor={QuaternaryColor}
        SecondaryColor={SecondaryColor}
      />
    </figure>
  );
};

DepthChart.propTypes = {
  TeamAbrv: PropTypes.string.isRequired,
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  PrimaryColor: PropTypes.string,
  QuaternaryColor: PropTypes.string,
  SecondaryColor: PropTypes.string,
};

DepthChart.defaultProps = {
  PrimaryColor: null,
  QuaternaryColor: null,
  SecondaryColor: null,
};

export default DepthChart;
