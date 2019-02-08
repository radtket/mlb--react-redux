import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TeamRoster from "./components/TeamRoster";
import { fetchTeamRoster } from "../../modules/teamRoster/actions";

class Team extends Component {
  async componentDidMount() {
    // Working
    // const { match } = this.props;
    // const { teamAbrv: currentTeamAbrv } = match.params;
    // await this.props.fetchTeamRoster(currentTeamAbrv);

    // eslint-disable-next-line react/destructuring-assignment
    await this.props.fetchTeamRoster();
  }

  render() {
    const { error, loading, match, teamRoster } = this.props;
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
  fetchTeamRoster: PropTypes.func.isRequired
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
