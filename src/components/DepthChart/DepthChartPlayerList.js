import React from "react";
import DepthChartPlayerListItem from "./DepthChartPlayerListItem";

const DepthChartPlayerList = ({ players, teamRoster }) => {
  return players.map(activeRosterMember => {
    const {
      first_name: FirstName,
      last_name: LastName,
      id,
    } = activeRosterMember;

    const playerObj = teamRoster.find(
      player => player.SportRadarPlayerID === id
    );

    return (
      <li key={id}>
        <DepthChartPlayerListItem
          hasPlayerId={playerObj && playerObj.PlayerID !== undefined}
          playerObj={playerObj}
          FirstName={FirstName}
          LastName={LastName}
          FormatedName={`${FirstName.charAt(0)}. ${LastName}`}
        />
      </li>
    );
  });
};

export default DepthChartPlayerList;
