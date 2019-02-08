import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSchedules } from "../../modules/schedules/actions";

class SchedulesList extends Component {
  componentDidMount() {
    this.props.fetchSchedules();
  }

  render() {
    const { error, loading, schedules } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        <li>hi</li>
        {schedules.map(game => (
          <li key={game.GameID}>{`${game.AwayTeam} vs ${game.HomeTeam}`}</li>
        ))}
      </ul>
    );
  }
}

SchedulesList.propTypes = {
  error: null || PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchSchedules: PropTypes.func.isRequired
};

SchedulesList.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  schedules: state.schedules.schedulesData,
  loading: state.schedules.loading,
  error: state.schedules.error
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
