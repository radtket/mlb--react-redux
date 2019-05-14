import React from "react";
import PropTypes from "prop-types";
import { MegaMenuTeam } from ".";
import { smallestToLargest } from "../../utils/helpers";

const MegaMenuDivision = ({ DivisionName, TeamsInDivision }) => {
  return (
    <div className="dropdown__division" key={DivisionName}>
      <h6>{DivisionName}</h6>
      <nav>
        {TeamsInDivision.sort(smallestToLargest("City")).map(team => {
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
