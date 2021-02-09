import React from "react";
import PropTypes from "prop-types";
import MegaMenuTeam from "./MegaMenuTeam";

import { smallestToLargest } from "../../utils/helpers";

const MegaMenuDivision = ({ DivisionName, TeamsInDivision }) => {
  return (
    <div className="col-sm-4">
      <h6>{DivisionName}</h6>
      <nav>
        {TeamsInDivision.sort(smallestToLargest("City")).map(team => {
          return <MegaMenuTeam key={team.TeamID} {...team} />;
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
