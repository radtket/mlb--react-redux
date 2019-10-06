import React from "react";
import PropTypes from "prop-types";
import { Calendar } from "../../../components/Calendar";

const PageTeamSchedule = ({ schedule, currentTeamAbrv }) => {
  return (
    <div className="container">
      <Calendar {...{ schedule, currentTeamAbrv }} />
    </div>
  );
};

PageTeamSchedule.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
};

export default PageTeamSchedule;
