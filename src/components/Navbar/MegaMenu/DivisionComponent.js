import React from "react";
import SingleTeam from "./SingleTeam";

const DivisionComponent = ({ DivisionName, TeamsInDivision }) => {
  return (
    <nav key={DivisionName} className="col col-md-3">
      <h6>{DivisionName}</h6>
      <ul>
        {TeamsInDivision.map(team => {
          return <SingleTeam {...team} />;
        })}
      </ul>
    </nav>
  );
};

export default DivisionComponent;
