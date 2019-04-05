import React from "react";
import PropTypes from "prop-types";
import MegaMenuTeam from "./MegaMenuTeam";
import { propComparator } from "../utils/helpers";

const MegaMenuDivision = ({ DivisionName, TeamsInDivision }) => {
  return (
    <div className="col-sm-4" key={DivisionName}>
      <h6>{DivisionName}</h6>
      <nav>
        {TeamsInDivision.sort(propComparator("City")).map(team => {
          const { TeamID } = team;
          return <MegaMenuTeam key={TeamID} {...team} />;
        })}
      </nav>
    </div>
  );
};

MegaMenuDivision.propTypes = {
  DivisionName: PropTypes.string.isRequired,
  TeamsInDivision: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MegaMenuDivision;
