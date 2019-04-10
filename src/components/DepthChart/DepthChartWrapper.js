import React from "react";
import DepthChartPosition from "./DepthChartPosition";

const DepthChartWrapper = ({
  positions,
  PrimaryColor,
  QuaternaryColor,
  SecondaryColor,
  teamRoster,
}) => {
  // eslint-disable-next-line react/prop-types
  const ThePen = ({ children }) => (
    <div className="depth-chart__bullpen-wrap">{children}</div>
  );

  const findStarterObj = (starterArg, teamRosterArg) => {
    return teamRosterArg.find(
      player => player.SportRadarPlayerID === starterArg.id
    );
  };

  const ThePenChildren = [];
  return positions.reduce(
    (allPos, singlePos) => {
      const { name, players } = singlePos;

      if (players && name === "CL") {
        const [starter] = players;
        ThePenChildren.push(
          <DepthChartPosition
            PrimaryColor={PrimaryColor}
            QuaternaryColor={QuaternaryColor}
            SecondaryColor={SecondaryColor}
            teamRoster={teamRoster}
            key={name}
            starterObj={findStarterObj(starter, teamRoster)}
            {...singlePos}
          />
        );
      }

      if (players && name === "BP") {
        const [starter, secondStarter] = players;
        ThePenChildren.push(
          <DepthChartPosition
            hasSecondStarter={secondStarter !== undefined}
            PrimaryColor={PrimaryColor}
            QuaternaryColor={QuaternaryColor}
            SecondaryColor={SecondaryColor}
            teamRoster={teamRoster}
            key={name}
            starterObj={findStarterObj(starter, teamRoster)}
            secondStarterObj={findStarterObj(secondStarter, teamRoster)}
            {...singlePos}
          />
        );
      }

      if (players && name !== "CL" && name !== "BP") {
        const [starter] = players;
        allPos.push(
          <DepthChartPosition
            PrimaryColor={PrimaryColor}
            QuaternaryColor={QuaternaryColor}
            SecondaryColor={SecondaryColor}
            teamRoster={teamRoster}
            key={name}
            starterObj={findStarterObj(starter, teamRoster)}
            {...singlePos}
          />
        );
      }

      return allPos;
    },
    [<ThePen key="ThePen">{ThePenChildren}</ThePen>]
  );
};

export default DepthChartWrapper;
