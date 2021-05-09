import React from "react";
import DepthChartPosition from "./DepthChartPosition";

const DepthChartWrapper = ({ positions, teamRoster }) => {
  const findStarterObj = (starterArg, teamRosterArg) => {
    return teamRosterArg.find(
      player => player.SportRadarPlayerID === starterArg.id
    );
  };

  const ThePenChildren = [];

  return positions.reduce(
    (allPos, singlePos) => {
      const { name, players } = singlePos;

      if (players) {
        const [starter, secondStarter] = players;
        const starterObj = findStarterObj(starter, teamRoster);
        if (name === "CL") {
          ThePenChildren.push(
            <DepthChartPosition
              key={name}
              {...{ ...singlePos, teamRoster, starterObj }}
            />
          );
        }

        if (name === "BP") {
          ThePenChildren.push(
            <DepthChartPosition
              key={name}
              {...{
                ...singlePos,
                teamRoster,
                starterObj,
                hasSecondStarter: secondStarter !== undefined,
                secondStarterObj: findStarterObj(secondStarter, teamRoster),
              }}
            />
          );
        }

        if (name !== "CL" && name !== "BP") {
          allPos.push(
            <DepthChartPosition
              key={name}
              {...{ ...singlePos, teamRoster, starterObj }}
            />
          );
        }
      }

      return allPos;
    },
    [
      <div key="ThePen" className="depth-chart__bullpen-wrap">
        {ThePenChildren}
      </div>,
    ]
  );
};

export default DepthChartWrapper;
