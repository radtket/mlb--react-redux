import React from "react";
import DepthChartPlayerListItem from "./DepthChartPlayerListItem";

const DepthChartPlayerList = ({ players, teamRoster }) => {
  return players.map(({ first_name: FirstName, last_name: LastName, id }) => {
    return (
      <li key={id}>
        <DepthChartPlayerListItem
          {...{
            ...teamRoster.find(
              ({ SportRadarPlayerID }) => SportRadarPlayerID === id
            ),
            FirstName,
            LastName,
          }}
          FormatedName={`${FirstName.charAt(0)}. ${LastName}`}
        />
      </li>
    );
  });
};

export default DepthChartPlayerList;
