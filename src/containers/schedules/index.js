import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSchedules } from "../../modules/schedules/actions";

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
      <ul>
        {schedules.map(game => (
          <li key={game.GameID}>{`${game.AwayTeam} vs ${game.HomeTeam}`}</li>
        ))}
      </ul>
    );
  }
}

SchedulesList.propTypes = {
  schedulesError: null || PropTypes.bool,
  schedulesLoading: PropTypes.bool.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired
};

SchedulesList.defaultProps = {
  schedulesError: null
};

const mapStateToProps = state => ({
  schedules: state.schedules.schedulesData,
  schedulesLoading: state.schedules.schedulesLoading,
  schedulesError: state.schedules.schedulesError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSchedules
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(SchedulesList);
