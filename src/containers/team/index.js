import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TeamRoster from "./components/TeamRoster";
import TeamRecentGames from "./components/TeamRecentGames";
import { fetchTeamRoster } from "../../modules/teamRoster/actions";

class Team extends Component {
  state = {
    recentGames: []
  };

  // async componentDidMount() {
  //   await this.props.fetchTeamRoster();
  // }

  componentDidMount() {
    const { schedules, match } = this.props;
    const { teamAbrv: currentTeamAbrv } = match.params;
    const recentGames = this.findTeamSchedule(schedules, currentTeamAbrv);
    this.setState({
      recentGames
    });
  }

  findTeamSchedule = (schedules, teamAbrv) => {
    return schedules
      .filter(
        team =>
          (team.HomeTeam === teamAbrv || team.AwayTeam === teamAbrv) &&
          team.Status !== "Scheduled"
      )
      .reverse();
  };

  render() {
    const { error, loading, match, teamRoster } = this.props;
    const { recentGames } = this.state;
    const { teamAbrv: currentTeamAbrv } = match.params;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{currentTeamAbrv}</h1>
        <TeamRecentGames
          activeTeam={currentTeamAbrv}
          recentGames={recentGames}
        />
        <TeamRoster teamRoster={teamRoster} error={error} loading={loading} />
      </div>
    );
  }
}

Team.propTypes = {
  error: null || PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamAbrv: PropTypes.string.isRequired
    })
  }).isRequired,
  fetchTeamRoster: PropTypes.func.isRequired,
  schedules: PropTypes.shape({
    Status: PropTypes.string,
    AwayTeam: PropTypes.string,
    HomeTeam: PropTypes.string
  }).isRequired
};

Team.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  teamRoster: state.teamRoster.teamRosterData,
  loading: state.teamRoster.loading,
  error: state.teamRoster.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamRoster
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Team);
