import React from "react";
import DepthChartPlayerListItem from "./DepthChartPlayerListItem";

const DepthChartPlayerList = ({ players, teamRoster }) => {
  return players.map(({ first_name: FirstName, last_name: LastName, id }) => {
    const playerObj = teamRoster.find(
      player => player.SportRadarPlayerID === id
    );

    return (
      <li key={id}>
        <DepthChartPlayerListItem
          FirstName={FirstName}
          FormatedName={`${FirstName.charAt(0)}. ${LastName}`}
          hasPlayerId={playerObj && playerObj.PlayerID !== undefined}
          LastName={LastName}
          playerObj={playerObj}
        />
      </li>
    );
  });
};

export default DepthChartPlayerList;
