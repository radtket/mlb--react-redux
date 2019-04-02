import React, { Component } from "react";
import PropTypes from "prop-types";
import Calendar from "../../../components/Calendar";

class PageTeamSchedule extends Component {
  render() {
    const { schedule, currentTeamAbrv } = this.props;
    return (
      <div className="container">
        <Calendar schedule={schedule} currentTeamAbrv={currentTeamAbrv} />
      </div>
    );
  }
}

PageTeamSchedule.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
};

export default PageTeamSchedule;
