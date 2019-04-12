import React from "react";
import PropTypes from "prop-types";
import DepthChartPlayerImage from "./DepthChartPlayerImage";
import DepthChartPlayerList from "./DepthChartPlayerList";

const DepthChartPosition = ({
  name,
  desc,
  players,
  teamRoster,
  PrimaryColor,
  QuaternaryColor,
  SecondaryColor,
  hasSecondStarter,
  secondStarterObj,
  starterObj,
}) => {
  const TeamColors = {
    PrimaryColor,
    QuaternaryColor,
    SecondaryColor,
  };

  return (
    <article
      className={`depth-chart__position depth-chart__position--${name.toLowerCase()}`}>
      <div>
        <DepthChartPlayerImage {...starterObj} {...TeamColors} />
        {hasSecondStarter && (
          <DepthChartPlayerImage
            {...secondStarterObj}
            {...TeamColors}
            style={{ position: "absolute", top: "44px" }}
          />
        )}
        <ul>
          <li className="depth-chart__position--header">
            {desc === "Starting Pitcher" ? "ROTATION" : desc.toUpperCase()}
          </li>
          <DepthChartPlayerList
            players={players}
            PrimaryColor={PrimaryColor}
            teamRoster={teamRoster}
          />
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
  PrimaryColor: PropTypes.string,
  SecondaryColor: PropTypes.string,
  QuaternaryColor: PropTypes.string,
  hasSecondStarter: PropTypes.bool,
};

DepthChartPosition.defaultProps = {
  PrimaryColor: "",
  SecondaryColor: "",
  QuaternaryColor: "",
  starterObj: {},
  secondStarterObj: {},
  hasSecondStarter: false,
};

export default DepthChartPosition;
