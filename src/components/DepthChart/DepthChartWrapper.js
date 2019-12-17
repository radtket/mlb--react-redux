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
        if (name === "CL") {
          const [starter] = players;
          ThePenChildren.push(
            <DepthChartPosition
              key={name}
              starterObj={findStarterObj(starter, teamRoster)}
              {...{ ...singlePos, teamRoster }}
            />
          );
        }

        if (name === "BP") {
          const [starter, secondStarter] = players;
          ThePenChildren.push(
            <DepthChartPosition
              key={name}
              hasSecondStarter={secondStarter !== undefined}
              secondStarterObj={findStarterObj(secondStarter, teamRoster)}
              starterObj={findStarterObj(starter, teamRoster)}
              {...{ ...singlePos, teamRoster }}
            />
          );
        }

        if (name !== "CL" && name !== "BP") {
          const [starter] = players;
          allPos.push(
            <DepthChartPosition
              key={name}
              starterObj={findStarterObj(starter, teamRoster)}
              {...{ ...singlePos, teamRoster }}
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
