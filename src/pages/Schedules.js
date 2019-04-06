import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isSameDay } from "date-fns";
import { fetchSchedules } from "../modules/schedules/actions";
import SingleGame from "../components/Standings/SingleGame";
import { TodaysDate } from "../utils/helpers";

const SchedulesList = ({ schedulesError, schedulesLoading, schedules }) => {
  if (schedulesError) {
    return <div>Error! {schedulesError.message}</div>;
  }

  if (schedulesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todays Games</h1>
      <ul>
        {schedules &&
          schedules.reduce((acc, game) => {
            const { Day, GameID } = game;

            isSameDay(Day, TodaysDate) &&
              acc.push(<SingleGame key={GameID} {...game} />);
            return acc;
          }, [])}
      </ul>
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
