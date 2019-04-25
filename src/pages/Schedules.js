/* eslint-disable no-console */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSchedules } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import { GameSlider } from "../components/GameDatesSlider";

const SchedulesList = ({ schedulesError, schedulesLoading, schedules }) => {
  if (schedulesError) {
    return <div>Error! {schedulesError.message}</div>;
  }

  if (schedulesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Todays Games</h1>
      <div className="col-sm-7">
        <GameSlider schedules={schedules} />
      </div>
    </div>
  );
};

SchedulesList.propTypes = {
  schedulesError: null || PropTypes.bool,
  schedulesLoading: PropTypes.bool.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SchedulesList.defaultProps = {
  schedulesError: null,
};

const mapStateToProps = ({ schedules }) => ({
  schedules: schedules.schedulesData,
  schedulesLoading: schedules.schedulesLoading,
  schedulesError: schedules.schedulesError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSchedules,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(SchedulesList);
