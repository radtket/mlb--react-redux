import React from "react";
import DepthChartPlayerListItem from "./DepthChartPlayerListItem";

const DepthChartPlayerList = ({ players, teamRoster }) => {
  return players.map(({ first_name: FirstName, last_name: LastName, id }) => {
    const playerObj = teamRoster.find(
      ({ SportRadarPlayerID }) => SportRadarPlayerID === id
    );

    return (
      <li key={id}>
        <DepthChartPlayerListItem
          {...{ FirstName, LastName, playerObj }}
          FormatedName={`${FirstName.charAt(0)}. ${LastName}`}
          hasPlayerId={playerObj && playerObj.PlayerID !== undefined}
        />
      </li>
    );
  });
};

export default DepthChartPlayerList;
