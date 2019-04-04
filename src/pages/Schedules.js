import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isSameDay } from "date-fns";
import { fetchSchedules } from "../modules/schedules/actions";
import SingleGame from "../components/Standings/SingleGame";
import { DEV_PLACEHOLDER_DATE } from "../utils/helpers";

class SchedulesList extends Component {
  render() {
    const { schedulesError, schedulesLoading, schedules } = this.props;

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

              isSameDay(Day, DEV_PLACEHOLDER_DATE) &&
                acc.push(<SingleGame key={GameID} {...game} />);
              return acc;
            }, [])}
        </ul>
      </div>
    );
  }
}

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
