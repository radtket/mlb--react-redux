import React from "react";
import PropTypes from "prop-types";
import DepthChartPlayerImage from "./DepthChartPlayerImage";
import DepthChartPlayerList from "./DepthChartPlayerList";

const DepthChartPosition = ({
  name,
  desc,
  players,
  teamRoster,
  hasSecondStarter,
  secondStarterObj,
  starterObj,
}) => {
  return (
    <article
      className={`depth-chart__position depth-chart__position--${name.toLowerCase()}`}
    >
      <div>
        <DepthChartPlayerImage {...starterObj} />
        {hasSecondStarter && (
          <DepthChartPlayerImage
            {...secondStarterObj}
            style={{ position: "absolute", top: "44px" }}
          />
        )}
        <ul>
          <li className="depth-chart__position--header">
            {desc === "Starting Pitcher" ? "ROTATION" : desc.toUpperCase()}
          </li>
          <DepthChartPlayerList players={players} teamRoster={teamRoster} />
        </ul>
      </div>
    </article>
  );
};

DepthChartPosition.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  starterObj: PropTypes.shape({
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    PhotoUrl: PropTypes.string,
  }),
  secondStarterObj: PropTypes.shape({
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    PhotoUrl: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  hasSecondStarter: PropTypes.bool,
};

DepthChartPosition.defaultProps = {
  starterObj: {},
  secondStarterObj: {},
  hasSecondStarter: false,
};

export default DepthChartPosition;
